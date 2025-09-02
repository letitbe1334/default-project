package com.deoh.demo.attach.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deoh.demo.attach.dto.AttachSettingRequestDto;
import com.deoh.demo.attach.dto.AttachSettingResponseDto;
import com.deoh.demo.attach.service.AttachSettingService;
import com.deoh.demo.config.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/attach")
@RequiredArgsConstructor
public class AttachSettingController {
	
	private final AttachSettingService attachSettingService;
	
    @GetMapping(value="/attachsetting/{taskClassCd}")
    public ResponseEntity<CommonResponseDto<AttachSettingResponseDto>> getAttachSetting(@ModelAttribute AttachSettingRequestDto requestDto, @PathVariable("taskClassCd") String taskClassCd) throws Exception {
    	requestDto.setTaskClassCd(taskClassCd);
    	return ResponseEntity.ok(CommonResponseDto.success(attachSettingService.getAttachSetting(requestDto)));
    }
    
}
