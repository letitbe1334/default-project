package com.deoh.demo.config.common;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "globals")
public class GlobalProperties {
    // 루트 파일 저장 경로
    private String fileStorePath;
    // zip 파일 저장 경로
    private String zipPath;
    // 파일명 정규식
    private String fileIllegalExp;
    // 이미지 없는 경우 표시할 기본 이미지 경로 (소스의 resources/public/아래 )
    private String noImageFilePath;
}
