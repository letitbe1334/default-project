package com.deoh.demo.auth.dto;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.deoh.demo.auth.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @용도 회원가입 성공 후 클라이언트에게 응답할 때 사용하는 DTO
 * @역할 민감한 정보(예: 비밀번호)를 제외한 사용자 정보(예: 이메일)를 담아 응답
 * @author kdh
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
	
    private Long memberId;
    private String email;
    private String nickname;
    private Set<String> authorities; // 권한명만 문자열로 전달
    private LocalDateTime createdAt;

    // 엔티티를 DTO로 변환하는 정적 팩토리 메서드
    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .authorities(member.getAuthorities().stream()
                        .map(authority -> authority.getAuthorityName())
                        .collect(Collectors.toSet()))
                .createdAt(member.getCreatedAt())
                .build();
    }

}
