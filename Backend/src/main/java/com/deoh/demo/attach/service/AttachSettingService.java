package com.deoh.demo.attach.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.deoh.demo.attach.dto.AttachSettingRequestDto;
import com.deoh.demo.attach.dto.AttachSettingResponseDto;
import com.deoh.demo.attach.entity.AttachSetting;
import com.deoh.demo.attach.repository.AttachSettingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttachSettingService {
	
	private final AttachSettingRepository attachSettingRepository;

    public AttachSettingResponseDto getAttachSetting(AttachSettingRequestDto requestDto) {
    	Optional<AttachSetting> attachSetting = attachSettingRepository.findById(requestDto.getTaskClassCd());
        return AttachSettingResponseDto.fromEntity(attachSetting.get());
    }
    
}
