package com.deoh.demo.menu.entity;

import com.deoh.demo.auth.entity.Authority;
import com.deoh.demo.config.common.BaseAuditingEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "authority_menu")
@IdClass(AuthorityMenuId.class) // 복합키 클래스 지정
public class AuthorityMenu extends BaseAuditingEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authority_id")
    private Authority authority;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    @Builder
    public AuthorityMenu(Authority authority, Menu menu) {
        this.authority = authority;
        this.menu = menu;
    }
}

