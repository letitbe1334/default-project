package com.deoh.demo.config.common;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass // 엔티티가 아니며, 자식 엔티티에 매핑 정보만 제공
@EntityListeners(AuditingEntityListener.class) // Auditing 기능 활성화
public class BaseAuditingEntity {

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt; // 생성 일시

    @CreatedBy
    @Column(name = "reg_id", updatable = false)
    private Long regId; // 등록자 ID (Long 타입으로 가정)

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt; // 수정 일시

    @LastModifiedBy
    @Column(name = "mod_id")
    private Long modId; // 수정자 ID (Long 타입으로 가정)

}
