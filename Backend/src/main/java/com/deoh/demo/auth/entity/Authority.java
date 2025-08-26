package com.deoh.demo.auth.entity;

import com.deoh.demo.config.common.BaseAuditingEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Authority extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "authority_id")
    private Long authorityId;

    @Column(name = "authority_name", nullable = false, unique = true)
    private String authorityName; // 예: "ROLE_USER", "ROLE_ADMIN"
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "use_flag")
    private String useFlag;

    @Builder
    public Authority(String authorityName, String description, String useFlag) {
        this.authorityName = authorityName;
        this.description = description;
        this.useFlag = useFlag;
    }
    
}
