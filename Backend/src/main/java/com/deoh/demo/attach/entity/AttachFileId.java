package com.deoh.demo.attach.entity;

import java.io.Serializable;

import org.hibernate.annotations.Comment;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
public class AttachFileId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Comment("첨부파일코드 SEQ")
    private Long attachFileId;

    @Comment("업무구분코드")
    private String taskClassCd;
}