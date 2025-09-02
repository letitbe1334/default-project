package com.deoh.demo.attach.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileMetadata {
	
    private String originalFileName;
    private String savedFileName;
    private String fileExtension;
    private String relativePath;
    private String contentType;
    private Long fileSize;
    private String taskClassCd;
    private String taskKey;
    private String description;
    
}	
