package com.deoh.demo.auth.dto;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.deoh.demo.auth.entity.Member;

import lombok.Getter;
import lombok.Setter;

/**
 * @용도 회원가입, 로그인 등 사용자 정보를 서버에 요청할 때 사용하는 DTO
 * @역할 사용자의 이메일, 비밀번호 등을 담아 서버로 전달.
 *     toMember() 메서드를 통해 엔티티로 변환하는 역할도 수행
 * @author kdh
 */
@Getter
@Setter
public class MemberRequestDto {

    private String email;
    private String password;
    private String nickname;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .build();
    }

}
