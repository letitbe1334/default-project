package com.deoh.demo.auth.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deoh.demo.auth.dto.MemberMenuRequestDto;
import com.deoh.demo.auth.dto.MemberMenuResponseDto;
import com.deoh.demo.auth.service.MemberMenuService;
import com.deoh.demo.config.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class MemberMenuController {

    private final MemberMenuService memberMenuService;
    
    @GetMapping("/member/menus")
    public ResponseEntity<CommonResponseDto<List<MemberMenuResponseDto>>> getMemberMenus(@ModelAttribute MemberMenuRequestDto requestDto) {
        return ResponseEntity.ok(CommonResponseDto.success(memberMenuService.getMemberMenus(requestDto)));
    }

}
