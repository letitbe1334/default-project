package com.deoh.demo.config.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * @용도 인증 성공 후 클라이언트에게 전달하는 토큰 정보를 담는 데이터 전송 객체
 * @역할 Access Token, Refresh Token, 토큰 타입(Bearer)을 필드로 가짐.
 *     JWT 토큰을 직접 주고받는 대신 이 객체를 통해 안전하고 구조화된 데이터를 주고받음.
 * @author kdh
 */
@Builder
@Data
@AllArgsConstructor
public class TokenInfo {
	
    private String grantType; // JWT에 대한 인증 타입. 일반적으로 "Bearer" 사용
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpirationTime;
    private Long refreshTokenExpirationTime;
    private Long refreshTokenCookieExpirationTime;

}
