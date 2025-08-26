package com.deoh.demo.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deoh.demo.auth.dto.MemberResponseDto;
import com.deoh.demo.auth.service.MemberService;
import com.deoh.demo.config.common.CommonResponseDto;
import com.deoh.demo.config.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/member/info")
    public ResponseEntity<CommonResponseDto<MemberResponseDto>> getMemberInfo(@RequestHeader("Authorization") String authorizationHeader) {
        String accessToken = authorizationHeader.substring("Bearer ".length());
        return ResponseEntity.ok(CommonResponseDto.success(memberService.getMemberInfo(jwtTokenProvider.getMemberId(accessToken))));
    }
	
}
