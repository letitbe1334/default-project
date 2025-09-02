package com.deoh.demo.attach.dto;

import org.springframework.web.multipart.MultipartFile;

import com.deoh.demo.attach.entity.AttachFile;
import com.deoh.demo.config.common.BaseRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttachFileRequestDto extends BaseRequest {
	
    private String taskClassCd;
    private String taskKey;
    private Long attachFileId;
    private MultipartFile uploadFile;
    private String description;

    public static AttachFile fromEntity(AttachFileRequestDto dto) {
        return AttachFile.builder()
        		.attachFileId(dto.getAttachFileId())
                .taskClassCd(dto.getTaskClassCd())
                .taskKey(dto.getTaskKey())
                .description(dto.getDescription())
                .build();
    }
    
}
