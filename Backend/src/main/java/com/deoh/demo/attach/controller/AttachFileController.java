package com.deoh.demo.attach.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.deoh.demo.attach.dto.AttachEncryptDto;
import com.deoh.demo.attach.dto.AttachFileRequestDto;
import com.deoh.demo.attach.dto.AttachFileResponseDto;
import com.deoh.demo.attach.service.AttachFileService;
import com.deoh.demo.config.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/attach")
@RequiredArgsConstructor
public class AttachFileController {
	
	private final AttachFileService attachFileService;

    @GetMapping(value = "/attachFiles")
	public ResponseEntity<CommonResponseDto<List<AttachFileResponseDto>>> getAttachFiles(@ModelAttribute AttachFileRequestDto requestDto) {
    	return ResponseEntity.ok(CommonResponseDto.success(attachFileService.getAttachFiles(requestDto)));
	}
    
    @PostMapping(value = "/attachFile/upload")
    public ResponseEntity<CommonResponseDto<Long>> uploadAttachFile(@RequestParam(value = "file") final MultipartFile uploadfile
    		, @RequestParam(value = "taskClassCd") final String taskClassCd
    		, @RequestParam(value = "taskKey") final String taskKey) {
    	return ResponseEntity.ok(CommonResponseDto.success(attachFileService.uploadAttachFile(AttachFileRequestDto.builder()
    			.uploadFile(uploadfile)
    			.taskClassCd(taskClassCd)
    			.taskKey(taskKey).build())));
    }
    
    @PostMapping(value = "/attachFile/copy")
    public ResponseEntity<CommonResponseDto<Long>> copyAttachFile(@RequestBody AttachFileRequestDto requestDto) {
    	return ResponseEntity.ok(CommonResponseDto.success(attachFileService.copyAttachFile(requestDto)));
    }
    
    @PutMapping(value = "/attachFile")
    public ResponseEntity<CommonResponseDto<?>> updateAttachFile(@RequestBody AttachFileRequestDto requestDto) {
    	attachFileService.updateAttachFile(requestDto);
    	return ResponseEntity.ok(CommonResponseDto.success());
    }
    
    @PutMapping(value = "/attachFile/taskKey")
    public ResponseEntity<CommonResponseDto<?>> updateTaskKey(@RequestBody List<AttachFileRequestDto> requestDtos) {
    	attachFileService.updateTaskKey(requestDtos);
    	return ResponseEntity.ok(CommonResponseDto.success());
    }
	
	@DeleteMapping(value="/attachFile/{sysAttachFileId}")
	public ResponseEntity<CommonResponseDto<?>> deleteAttachFile(@PathVariable String sysAttachFileId) {
		attachFileService.deleteAttachFile(sysAttachFileId);
		return ResponseEntity.ok(CommonResponseDto.success());
	}
	
	@DeleteMapping(value="/attachFile/{taskKey}/{taskClassCd}")
	public ResponseEntity<CommonResponseDto<?>> deleteFiles(@PathVariable String taskKey, @PathVariable String taskClassCd) {
		attachFileService.deleteAttachFiles(taskKey, taskClassCd);
		return ResponseEntity.ok(CommonResponseDto.success());
	}
	
    @GetMapping(value = "/attachFile/preview")
	public @ResponseBody AttachEncryptDto getImageToByte(@ModelAttribute AttachFileRequestDto requestDto) {
    	return attachFileService.getFileAsBase64Bytes(requestDto);
	}
    
    @GetMapping(value = "/attachFile/down")
    public @ResponseBody AttachEncryptDto getFileToByte(@ModelAttribute AttachFileRequestDto requestDto) {
    	return attachFileService.getFileToByte(requestDto);
    }

    @GetMapping(value = "/attachFiles/temp")
	public ResponseEntity<CommonResponseDto<List<AttachFileResponseDto>>> getAttachFilesTemp(@ModelAttribute AttachFileRequestDto requestDto) {
    	return ResponseEntity.ok(CommonResponseDto.success(attachFileService.getAttachFilesTemp(requestDto)));
	}
    
}
