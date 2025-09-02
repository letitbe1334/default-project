package com.deoh.demo.config.common;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;

import com.deoh.demo.attach.dto.AttachFileResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileUtil {
	
	private static final int PREVIEW_SIZE = 150;

    public static void setPreviewImage(AttachFileResponseDto attachFile) {
        // 이미지 파일인지 확인하는 로직을 분리
        if (attachFile.getContentType() != null && attachFile.getContentType().startsWith("image")) {
            try {
                // 원본 이미지 파일을 가져옵니다.
                File file = getFile(attachFile.getFilePhysicalPath(), attachFile.getOriFileNm());

                // 이미지를 리사이징하고 바이트 배열로 변환합니다.
                byte[] resizedImageBytes = resizeImage(file, PREVIEW_SIZE, attachFile.getFileExt());

                // Base64로 인코딩합니다.
                String encodedString = Base64.encodeBase64String(resizedImageBytes);

                // DTO에 프리뷰 이미지를 설정합니다.
                attachFile.withPreviewImage(encodedString);

            } catch (IOException e) {
                // 파일 I/O 관련 예외를 처리합니다.
            	log.error("Error processing image file: {}", e.getMessage(), e);
            }
        }
    }

    private static byte[] resizeImage(File file, int size, String format) throws IOException {
        try (InputStream inputStream = new FileInputStream(file);
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            // 1. 이미지를 메모리로 읽어옵니다.
            BufferedImage originalImage = ImageIO.read(inputStream);

            // 2. 새로운 크기의 빈 이미지를 생성합니다.
            BufferedImage resizedImage = new BufferedImage(size, size, originalImage.getType());

            // 3. Graphics2D를 사용하여 원본 이미지를 새 이미지에 그립니다.
            Graphics2D graphics2D = resizedImage.createGraphics();
            graphics2D.drawImage(originalImage, 0, 0, size, size, null);
            graphics2D.dispose(); // 자원 해제

            // 4. 리사이징된 이미지를 스트림에 씁니다.
            ImageIO.write(resizedImage, format, outputStream);

            return outputStream.toByteArray();

        } catch (IOException e) {
            // 예외를 로그에 기록하고 다시 던져 상위 호출자가 처리하도록 합니다.
        	log.error("Failed to resize image: {}", e.getMessage(), e);
            throw e;
        }
    }

    public static File getFile(String filePhysicalPath, String FileOrgNm) throws FileNotFoundException {
        if (StringUtils.isEmpty(FileOrgNm)) {
            throw new FileNotFoundException("File information not found.");
        }

        return new File(filePhysicalPath);
    }
}
