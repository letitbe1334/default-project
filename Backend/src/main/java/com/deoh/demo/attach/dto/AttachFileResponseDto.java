package com.deoh.demo.attach.dto;

import com.deoh.demo.attach.entity.AttachFile;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttachFileResponseDto {

    private final Long attachFileId;
    private final String taskClassCd;
    private final String taskKey;
    private final String oriFileNm;
    private final String saveFileNm;
    private final String fileExt;
    private final Long fileSize;
    private final String filePhysicalPath;
    private final String fileDownPath;
    private final String contentType;
    private final String description;
    private final String previewImage;


    public static AttachFileResponseDto fromEntity(AttachFile entity) {
        return AttachFileResponseDto.builder()
                .attachFileId(entity.getAttachFileId())
                .taskClassCd(entity.getTaskClassCd())
                .taskKey(entity.getTaskKey())
                .oriFileNm(entity.getOriFileNm())
                .saveFileNm(entity.getSaveFileNm())
                .fileExt(entity.getFileExt())
                .fileSize(entity.getFileSize())
                .filePhysicalPath(entity.getFilePhysicalPath())
                .fileDownPath(entity.getFileDownPath())
                .contentType(entity.getContentType())
                .description(entity.getDescription())
                .build();
    }

    @Builder
	public AttachFileResponseDto(Long attachFileId, String taskClassCd, String taskKey, String oriFileNm,
			String saveFileNm, String fileExt, Long fileSize, String filePhysicalPath, String fileDownPath,
			String contentType, String description, String previewImage) {
		this.attachFileId = attachFileId;
		this.taskClassCd = taskClassCd;
		this.taskKey = taskKey;
		this.oriFileNm = oriFileNm;
		this.saveFileNm = saveFileNm;
		this.fileExt = fileExt;
		this.fileSize = fileSize;
		this.filePhysicalPath = filePhysicalPath;
		this.fileDownPath = fileDownPath;
		this.contentType = contentType;
		this.description = description;
		this.previewImage = previewImage;
	}
    
    public AttachFileResponseDto withPreviewImage(String previewImage) {
        return AttachFileResponseDto.builder()
            .attachFileId(this.attachFileId)
            .taskClassCd(this.taskClassCd)
            .taskKey(this.taskKey)
            .oriFileNm(this.oriFileNm)
            .saveFileNm(this.saveFileNm)
            .fileExt(this.fileExt)
            .fileSize(this.fileSize)
            .filePhysicalPath(this.filePhysicalPath)
            .fileDownPath(this.fileDownPath)
            .contentType(this.contentType)
            .description(this.description)
            .previewImage(previewImage)
            .build();
    }
}
