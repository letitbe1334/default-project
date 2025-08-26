package com.deoh.demo.menu.entity;

import com.deoh.demo.config.common.BaseAuditingEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "menu")
public class Menu extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    // 상위 메뉴 ID (계층 구조를 위해 추가)
    @Column
    private Long parentMenuId;

    @Column(nullable = false, unique = true)
    private String menuName;

    @Column(nullable = false)
    private String path;

    @Column
    private String icon;
    
    @Column(nullable = false)
    private int menuLevel;

    // 메뉴의 순서를 나타내는 필드명 통일
    @Column(nullable = false)
    private Integer sortOrder;
    
    // 메뉴 사용 여부 (use_flag='Y': 사용, 'N': 미사용)
    @Column(name = "use_flag", nullable = false, columnDefinition = "char(1) default 'Y'")
    private String useFlag;

    @Builder
    public Menu(Long parentMenuId, String menuName, String path, String icon, Integer sortOrder, String useFlag) {
        this.parentMenuId = parentMenuId;
        this.menuName = menuName;
        this.path = path;
        this.icon = icon;
        this.sortOrder = sortOrder;
        this.useFlag = useFlag;
    }

}
