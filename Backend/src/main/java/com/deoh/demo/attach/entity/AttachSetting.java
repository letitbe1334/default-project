package com.deoh.demo.attach.entity;

import java.math.BigDecimal;

import org.hibernate.annotations.Comment;

import com.deoh.demo.config.common.BaseAuditingEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "attach_setting")
public class AttachSetting extends BaseAuditingEntity {

    @Id
    @Column(name = "task_class_cd", length = 50, nullable = false)
    @Comment("업무구분코드")
    private String taskClassCd;

    @Column(name = "task_class_desc", length = 200)
    @Comment("업무구분설명")
    private String taskClassDesc;

    @Column(name = "accept_ext", length = 400)
    @Comment("허용확장자")
    private String acceptExt;

    @Column(name = "limit_cnt")
    @Comment("업로드가능파일수")
    private Integer limitCnt;

    @Column(name = "limit_size")
    @Comment("업로드가능파일크기")
    private Integer limitSize;

    @Column(name = "drag_drop_flag", length = 1)
    @Comment("DragDrop허용여부")
    private String dragDropFlag;

    @Column(name = "multiple_sel_flag", length = 1)
    @Comment("파일다중선택가능여부")
    private String multipleSelFlag;

    @Column(name = "preview_flag", length = 1)
    @Comment("미리보기여부")
    private String previewFlag;

    @Column(name = "explain_flag", length = 1)
    @Comment("설명작성 가능여부")
    private String explainFlag;

    @Column(name = "only_image_flag", length = 1)
    @Comment("이미지전용 여부")
    private String onlyImageFlag;

    @Column(name = "img_width")
    @Comment("이미지 넓이")
    private Integer imgWidth;

    @Column(name = "img_height")
    @Comment("이미지 높이")
    private Integer imgHeight;

    @Column(name = "resize_width")
    @Comment("첨부이미지 리사이즈 넓이")
    private Integer resizeWidth;

    @Column(name = "resize_quality", precision = 2, scale = 1)
    @Comment("첨부이미지 리사이즈 품질")
    private BigDecimal resizeQuality;

    @Column(name = "use_flag", length = 1)
    @Comment("사용여부")
    private String useFlag;

}
