package com.deoh.demo.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberMenuDto {

    private Long menuId;
    private Long parentMenuId;
    private String menuName;
    private String path;
    private String icon;
    private String githubOwner;
    private String githubRepo;
    private String githubBranch;
    private int menuLevel;
    private Integer sortOrder;
    
}
