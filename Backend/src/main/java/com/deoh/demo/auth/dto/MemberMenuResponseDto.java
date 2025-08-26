package com.deoh.demo.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberMenuResponseDto {

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

    public static MemberMenuResponseDto of(MemberMenuDto memberMenuDto) {
        return MemberMenuResponseDto.builder()
                .menuId(memberMenuDto.getMenuId())
                .parentMenuId(memberMenuDto.getParentMenuId())
                .menuName(memberMenuDto.getMenuName())
                .path(memberMenuDto.getPath())
                .icon(memberMenuDto.getIcon())
                .githubOwner(memberMenuDto.getGithubOwner())
                .githubRepo(memberMenuDto.getGithubRepo())
                .githubBranch(memberMenuDto.getGithubBranch())
                .menuLevel(memberMenuDto.getMenuLevel())
                .sortOrder(memberMenuDto.getSortOrder())
                .build();
    }

}
