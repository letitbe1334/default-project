package com.deoh.demo.auth.entity;

import java.util.HashSet;
import java.util.Set;

import com.deoh.demo.config.common.BaseAuditingEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class Member extends BaseAuditingEntity {

    @Id // 기본키(Primary Key)임을 명시
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 자동 생성 전략
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    // Member와 Authority의 다대다(Many-to-Many) 관계 설정
    // JoinTable을 사용하여 'member_authority' 테이블을 생성합니다.
    // 지연 로딩(fetch = FetchType.LAZY)을 사용하여 성능을 최적화합니다.
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "member_authority",
        joinColumns = @JoinColumn(name = "member_id"),
        inverseJoinColumns = @JoinColumn(name = "authority_id")
    )
    private Set<Authority> authorities = new HashSet<>();

    @Builder
    public Member(String email, String password, String nickname, Set<Authority> authorities) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        if (authorities != null) {
            this.authorities = authorities;
        }
    }

}
