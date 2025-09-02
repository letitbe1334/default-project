package com.deoh.demo.attach.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;

import com.deoh.demo.config.common.BaseAuditingEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "attach_file", schema = "psm")
@Comment("첨부파일")
public class AttachFile extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attach_file_id")
    private Long attachFileId; // 엔티티 자체에 ID 필드 선언

    @Column(name = "task_class_cd")
    private String taskClassCd;

    @Column(name = "task_key", length = 100, nullable = false)
    @Comment("업무 SEQ")
    private String taskKey;

    @Column(name = "ori_file_nm", length = 100)
    @Comment("원본파일명")
    private String oriFileNm;

    @Column(name = "save_file_nm", length = 100)
    @Comment("저장파일명")
    private String saveFileNm;

    @Column(name = "file_ext", length = 10)
    @Comment("파일확장자")
    private String fileExt;

    @Column(name = "file_size")
    @Comment("파일크기")
    private Long fileSize;

    @Column(name = "file_physical_path", length = 300)
    @Comment("물리파일경로")
    private String filePhysicalPath;

    @Column(name = "file_down_path", length = 300)
    @Comment("파일다운로드 경로")
    private String fileDownPath;

    @Column(name = "content_type", length = 100)
    @Comment("Content-Type")
    private String contentType;

    @Column(name = "description", length = 500)
    @Comment("첨부파일 설명")
    private String description;

    @Column(name = "del_flag", length = 1)
    @Comment("삭제여부")
    private String delFlag = "N";

    @Column(name = "del_dt")
    @Comment("삭제일시")
    private LocalDateTime delDt;

}
