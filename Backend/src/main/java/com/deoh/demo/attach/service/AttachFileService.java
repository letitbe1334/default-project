package com.deoh.demo.attach.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import com.deoh.demo.attach.dto.AttachEncryptDto;
import com.deoh.demo.attach.dto.AttachFileRequestDto;
import com.deoh.demo.attach.dto.AttachFileResponseDto;
import com.deoh.demo.attach.dto.FileMetadata;
import com.deoh.demo.attach.entity.AttachFile;
import com.deoh.demo.attach.mapper.AttachFileMapper;
import com.deoh.demo.attach.repository.AttachFileRepository;
import com.deoh.demo.config.common.AES256Util;
import com.deoh.demo.config.common.DateUtil;
import com.deoh.demo.config.common.FileUtil;
import com.deoh.demo.config.common.GlobalProperties;
import com.deoh.demo.config.exception.EncryptionException;
import com.deoh.demo.config.exception.FileProcessingException;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttachFileService {
	
	private final AttachFileRepository attachFileRepository;
	private final AttachFileMapper attachFileMapper;
	private final GlobalProperties globalProperties;
    private final AES256Util aes256Util;
    private Path fileStorageLocation;
    private Path zipStorageLocation;

    private final ExecutorService executor = Executors.newFixedThreadPool(2);


    @PostConstruct
    public void init() throws Exception {
        this.fileStorageLocation = Paths.get(globalProperties.getFileStorePath()).toAbsolutePath().normalize();
        this.zipStorageLocation = Paths.get(globalProperties.getZipPath()).toAbsolutePath().normalize();
        
        Files.createDirectories(this.fileStorageLocation);
        Files.createDirectories(this.zipStorageLocation);
    }
    
    // 이 메서드들은 필드를 반환하므로 getter를 제공하는 게 좋습니다.
    public Path getFileStorageLocation() {
        return fileStorageLocation;
    }

    public Path getZipStorageLocation() {
        return zipStorageLocation;
    }

    public List<AttachFileResponseDto> getAttachFiles(AttachFileRequestDto requestDto) {
    	List<AttachFile> files = attachFileMapper.getAttachFiles(requestDto);
    	
        return files.stream()
    			.map(file -> {
    				AttachFileResponseDto dto = AttachFileResponseDto.fromEntity(file);
        			FileUtil.setPreviewImage(dto);
    				return dto;
    			})
    			.collect(Collectors.toList());
    }

    public Long uploadAttachFile(AttachFileRequestDto requestDto) {
        try {
            // 파일 저장 및 엔티티 생성
            AttachFile newFile = this.storeFile(requestDto);
            
            // 데이터베이스에 엔티티 저장
            attachFileRepository.save(newFile);
            
            // 저장된 파일의 ID 반환
            return newFile.getAttachFileId();
            
        } catch (Exception e) {
            // 파일 저장 로직에서 예외 발생 시 처리
            // 로깅을 통해 상세 오류를 기록하고,
            // 클라이언트에게는 명확한 오류 메시지를 전달하기 위해 RuntimeException을 던집니다.
            throw new RuntimeException("파일 저장에 실패하였습니다: " + e.getMessage(), e);
        }
    }
    

    public AttachFile storeFile(AttachFileRequestDto requestDto) throws Exception {
        MultipartFile uploadFile = requestDto.getUploadFile();
        
        // 1. 유효성 검사 및 파일 정보 추출
        validateFileName(uploadFile.getOriginalFilename());
        FileMetadata fileMetadata = extractFileMetadata(uploadFile, requestDto);

        // 2. 파일 저장 경로 생성 및 디렉터리 생성
        Path targetPath = createAndCheckDirectory(fileMetadata);

        // 3. 파일 저장
        saveFileToDisk(uploadFile, targetPath);

        // 4. AttachFile 엔티티 반환
        AttachFile attachFile = createAttachFileEntity(fileMetadata, targetPath);

        // 5. 업로드 직후 변환 시작 (비동기)
        convertToOptimizedFormatsAsync(targetPath);

        return attachFile;
    }
    
    private void validateFileName(String fileName) throws IOException {
        if (fileName == null || fileName.isBlank()) {
            throw new IOException("파일명이 존재하지 않습니다.");
        }
        if (fileName.matches(globalProperties.getFileIllegalExp())) {
            throw new IOException("파일명에 허용되지 않는 문자가 포함되어 있습니다. 파일명: " + fileName);
        }
    }
    
    private FileMetadata extractFileMetadata(MultipartFile uploadFile, AttachFileRequestDto requestDto) {
        String originalFileName = uploadFile.getOriginalFilename();
        String extension = FilenameUtils.getExtension(originalFileName);
        String savedFileName = UUID.randomUUID() + "." + extension;

        String taskClassCd = requestDto.getTaskClassCd();
        String relativePath = Paths.get(taskClassCd, DateUtil.currentDateYYYYMMDD()).toString();

        return FileMetadata.builder()
            .originalFileName(originalFileName)
            .savedFileName(savedFileName)
            .fileExtension(extension)
            .relativePath(relativePath)
            .contentType(uploadFile.getContentType())
            .fileSize(uploadFile.getSize())
            .taskClassCd(requestDto.getTaskClassCd())
            .taskKey(requestDto.getTaskKey())
            .description(requestDto.getDescription())
            .build();
    }
    
    private Path createAndCheckDirectory(FileMetadata fileMetadata) throws IOException {
        Path directoryPath = fileStorageLocation.resolve(fileMetadata.getRelativePath());
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
            // 디렉터리 권한 설정 로직은 필요에 따라 여기에 추가
            File directory = directoryPath.toFile();
            directory.setExecutable(false, false);
            directory.setReadable(true);
            directory.setWritable(false, false);
        }
        return directoryPath.resolve(fileMetadata.getSavedFileName());
    }
    
    private void saveFileToDisk(MultipartFile uploadFile, Path targetPath) throws IOException {
        try (var inputStream = uploadFile.getInputStream()) {
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        }
    }
    
    private AttachFile createAttachFileEntity(FileMetadata fileMetadata, Path targetPath) {
        return AttachFile.builder()
                .taskClassCd(fileMetadata.getTaskClassCd())
                .taskKey(fileMetadata.getTaskKey())
                .oriFileNm(fileMetadata.getOriginalFileName())
                .saveFileNm(fileMetadata.getSavedFileName())
                .fileExt(fileMetadata.getFileExtension())
                .fileSize(fileMetadata.getFileSize())
                .filePhysicalPath(targetPath.toString())
                .fileDownPath(fileMetadata.getRelativePath() + File.separator + fileMetadata.getSavedFileName())
                .contentType(fileMetadata.getContentType())
                .description(fileMetadata.getDescription())
                .build();
    }


    public Long copyAttachFile(AttachFileRequestDto requestDto) {
    	AttachFile attachFile = attachFileRepository.findById(requestDto.getAttachFileId())
    			.orElseThrow(() -> new EntityNotFoundException("파일이 존재하지 않습니다. ID: " + requestDto.getAttachFileId()));
    	attachFile.setTaskKey(requestDto.getTaskKey());
    	attachFile.setTaskClassCd(requestDto.getTaskClassCd()); 
    	
    	// DB에 파일정보 저장
		attachFileRepository.save(attachFile);
		return attachFile.getAttachFileId();
    }
    
    public void updateAttachFile(AttachFileRequestDto requestDto) {
    	attachFileMapper.updateAttachFile(AttachFile.builder()
        		.attachFileId(requestDto.getAttachFileId())
                .taskClassCd(requestDto.getTaskClassCd())
                .taskKey(requestDto.getTaskKey())
                .description(requestDto.getDescription())
                .build());
    }

    @Transactional
    public int updateTaskKey(List<AttachFileRequestDto> requestDtos) {
    	List<AttachFile> files = requestDtos.stream()
			.map(requestDto -> {
				return AttachFileRequestDto.fromEntity(requestDto);
			})
			.collect(Collectors.toList());
    	
    	if (!CollectionUtils.isEmpty(files)) {
    		for(AttachFile file : files) {
    			attachFileMapper.updateAttachFile(file);
    		}
    	}
    	return 1;
    }

    public void deleteAttachFile(String sysAttachFileId) {
    	attachFileMapper.deleteAttachFile(sysAttachFileId);
    }
    
    public void deleteAttachFiles(String taskKey, String taskClassCd) {
    	attachFileMapper.deleteAttachFiles(taskKey, taskClassCd);
    }


    public AttachEncryptDto getFileAsBase64Bytes(AttachFileRequestDto requestDto) {
        // 1. 암복호화 처리
        String decodedId = handleIdDecoding(requestDto);

        // 2. 파일 정보 조회
        AttachFile fileInfo = attachFileMapper.getAttachFile(requestDto);

        // 3. 파일에서 바이트 배열 읽기
        byte[] fileBytes = getFileBytesFromDisk(fileInfo);

        // 4. Base64 인코딩
        String encodedString = Base64.encodeBase64String(fileBytes);
        byte[] bytes = encodedString.getBytes(StandardCharsets.UTF_8);

    	return getFileByteToEncoding(bytes, decodedId);
    }
    
    private byte[] getFileBytesFromDisk(AttachFile fileInfo) {
        // 1. 파일이 없는 경우 No Image 파일 반환
        if (fileInfo == null || fileInfo.getFilePhysicalPath() == null) {
            return getDefaultImageBytes();
        }

        // 2. 파일에서 바이트 배열 읽기
        // try-with-resources로 자원 자동 해제
        try (InputStream inputStream = new FileInputStream(new File(fileInfo.getFilePhysicalPath()))) {
            return IOUtils.toByteArray(inputStream);
        } catch (Exception e) {
            throw new FileProcessingException("파일을 읽는 도중 오류가 발생했습니다.", e);
        }
    }
    
    private byte[] getDefaultImageBytes() {
        // try-with-resources로 자원 자동 해제
        try (InputStream inputStream = new ClassPathResource(globalProperties.getNoImageFilePath()).getInputStream()) {
            return IOUtils.toByteArray(inputStream);
        } catch (Exception e) {
            throw new FileProcessingException("기본 이미지를 읽을 수 없습니다.", e);
        }
    }

    public AttachEncryptDto getFileToByte(AttachFileRequestDto requestDto) {
        // 1. 암복호화 처리
        String decodedId = handleIdDecoding(requestDto);

        // 2. 파일 정보 조회
        AttachFile fileInfo = attachFileMapper.getAttachFile(requestDto);

        // 3. 파일에서 바이트 배열 읽기
        byte[] fileBytes = getFileBytesFromDisk(fileInfo);

        // 4. Base64 인코딩
        byte[] encodedBytes = Base64.encodeBase64(fileBytes);

        return getFileByteToEncoding(encodedBytes, decodedId);
    }
    
    private String handleIdDecoding(AttachFileRequestDto requestDto) {
        if (requestDto.getAttachFileId() != null) {
        	String decodingId = aes256Util.fullDecode(requestDto.getAttachFileId().toString());
        	requestDto.setAttachFileId(Long.parseLong(decodingId));
            return decodingId;
        }
        return requestDto.getTaskKey();
    }

    public AttachEncryptDto getFileByteToEncoding(byte[] fileBytes, String id) {
        if (fileBytes == null || fileBytes.length == 0) {
            // 빈 바이트 배열이면 빈 DTO 반환
            return AttachEncryptDto.builder().build();
        }
        
        try {
            return AttachEncryptDto.builder()
                    .id(aes256Util.fullEncode(id))
                    .bytes(fileBytes)
                    .build();
        } catch (Exception e) {
            throw new EncryptionException("데이터 암호화 중 오류가 발생했습니다.", e);
        }
    }
    
    private void convertToOptimizedFormatsAsync(Path originalPath) {
        executor.submit(() -> {
            try {
                runCwebp(originalPath, getSiblingPath(originalPath, "webp"), 75);
                runAvifenc(originalPath, getSiblingPath(originalPath, "avif"));
            } catch (Exception e) {
                e.printStackTrace();
                // TODO: DB status 업데이트 (FAILED)
            }
        });
    }

    private Path getSiblingPath(Path original, String newExt) {
        String fileName = original.getFileName().toString();
        int dot = fileName.lastIndexOf('.');
        String base = (dot == -1) ? fileName : fileName.substring(0, dot);
        return original.getParent().resolve(base + "." + newExt);
    }

    private void runCwebp(Path input, Path output, int quality) throws IOException, InterruptedException {
        List<String> cmd = List.of(
        		"cwebp", 
        		"-q", String.valueOf(quality), 
        		input.toString(), 
        		"-o", output.toString());
        runProcess(cmd);
    }

    private void runAvifenc(Path input, Path output) throws IOException, InterruptedException {
        List<String> cmd = List.of(
        		"avifenc", 
        		input.toString(), 
        		output.toString());
        runProcess(cmd);
    }

    private void runProcess(List<String> cmd) throws IOException, InterruptedException {
        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.redirectErrorStream(true);
        Process proc = pb.start();

        try (InputStream is = proc.getInputStream()) {
            String output = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            int exit = proc.waitFor();
            if (exit != 0) {
                throw new RuntimeException("Command failed: " + String.join(" ", cmd) + "\n" + output);
            }
        }
    }

    public List<AttachFileResponseDto> getAttachFilesTemp(AttachFileRequestDto requestDto) {
    	List<AttachFile> files = new ArrayList<AttachFile>();
    	AttachFile onefile = attachFileMapper.getAttachFile(requestDto);
    	for (int i = 0; i < 50; i++) {
    		files.add(onefile);
    	}
    	
        return files.stream()
        		.map(AttachFileResponseDto::fromEntity)
    			.collect(Collectors.toList());
    }
    
}
