package com.deoh.demo.attach.dto;

import java.math.BigDecimal;

import com.deoh.demo.attach.entity.AttachSetting;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttachSettingResponseDto {
	
    private final String taskClassCd;
    private final String taskClassDesc;
    private final String acceptExt;
    private final Integer limitCnt;
    private final Integer limitSize;
    private final boolean dragDropFlag;
    private final boolean multipleSelFlag;
    private final boolean previewFlag;
    private final boolean explainFlag;
    private final boolean onlyImageFlag;
    private final Integer imgWidth;
    private final Integer imgHeight;
    private final Integer resizeWidth;
    private final BigDecimal resizeQuality;
    private final boolean useFlag;

    public static AttachSettingResponseDto fromEntity(AttachSetting entity) {
        return AttachSettingResponseDto.builder()
                .taskClassCd(entity.getTaskClassCd())
                .taskClassDesc(entity.getTaskClassDesc())
                .acceptExt(entity.getAcceptExt())
                .limitCnt(entity.getLimitCnt())
                .limitSize(entity.getLimitSize())
                .dragDropFlag("Y".equalsIgnoreCase(entity.getDragDropFlag()))
                .multipleSelFlag("Y".equalsIgnoreCase(entity.getMultipleSelFlag()))
                .previewFlag("Y".equalsIgnoreCase(entity.getPreviewFlag()))
                .explainFlag("Y".equalsIgnoreCase(entity.getExplainFlag()))
                .onlyImageFlag("Y".equalsIgnoreCase(entity.getOnlyImageFlag()))
                .imgWidth(entity.getImgWidth())
                .imgHeight(entity.getImgHeight())
                .resizeWidth(entity.getResizeWidth())
                .resizeQuality(entity.getResizeQuality())
                .useFlag("Y".equalsIgnoreCase(entity.getUseFlag()))
                .build();
    }
}
