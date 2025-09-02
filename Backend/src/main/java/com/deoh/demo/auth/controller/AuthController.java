package com.deoh.demo.auth.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deoh.demo.auth.dto.MemberRequestDto;
import com.deoh.demo.auth.service.AuthService;
import com.deoh.demo.config.common.CommonResponseDto;
import com.deoh.demo.config.common.CookieUtils;
import com.deoh.demo.config.jwt.TokenInfo;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    @Value("${deoh.email}")
    private String adminEmail;
    @Value("${deoh.password}")
    private String adminPassword;

    @PostMapping("/signup")
    public ResponseEntity<CommonResponseDto<?>> signup(@RequestBody MemberRequestDto requestDto) {
    	authService.signup(requestDto);
        return ResponseEntity.ok(CommonResponseDto.success("회원가입 성공"));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenInfo> login(@RequestBody MemberRequestDto requestDto, HttpServletResponse response) {
        TokenInfo tokenInfo = authService.login(requestDto);

        return ResponseEntity.ok(setCookieToken(tokenInfo, response));
    }
    
    @PostMapping("/login/deoh")
    public ResponseEntity<TokenInfo> autoLogin(HttpServletResponse response) {
        MemberRequestDto requestDto = MemberRequestDto.builder()
                .email(adminEmail)
                .password(adminPassword)
                .build();
    	TokenInfo tokenInfo = authService.login(requestDto);
    	
    	return ResponseEntity.ok(setCookieToken(tokenInfo, response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenInfo> refreshAccessToken(
            @CookieValue(value = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response) {

        System.out.println("## refreshToken " + refreshToken);
        // Refresh Token이 없으면 직접 401 Unauthorized를 반환
        if (refreshToken == null) {
            // 200 응답을 생성해 보냄.
        	// refresh api는 인증토큰이 없더라도 올 수 있게 설정함에 따라 refresh token이 없으면 accessToken을 null처리하여 보냄.
            return ResponseEntity.status(HttpStatus.OK).body(
                TokenInfo.builder()
                        .grantType(null)
                        .accessToken(null)
                        .refreshToken(null)
                        .accessTokenExpirationTime(null)
                        .refreshTokenExpirationTime(null)
                        .build()
            );
        }
        
        // AuthService를 통해 새로운 토큰 쌍을 발급받음
    	TokenInfo newTokenPair = authService.refreshTokens(refreshToken);

        return ResponseEntity.ok(setCookieToken(newTokenPair, response));
    }
    
    public TokenInfo setCookieToken(TokenInfo tokenInfo, HttpServletResponse response) {
    	// 새로운 Refresh Token을 HttpOnly 쿠키에 담아 응답
		ResponseCookie newRefreshTokenCookie = ResponseCookie.from("refreshToken", tokenInfo.getRefreshToken())
		    .httpOnly(true)
//		    .secure(false) // 개발 환경에서는 false로 설정
		    .path("/")
		    .maxAge(60*60*24)
//		    .maxAge(tokenInfo.getRefreshTokenCookieExpirationTime() / 1000)
//		    .sameSite("None") // SameSite 속성 명시적으로 설정
		    .build();
		
		// HTTP 응답 헤더에 쿠키 추가
		response.addHeader(HttpHeaders.SET_COOKIE, newRefreshTokenCookie.toString());

        // 응답 본문에는 Access Token만 포함된 TokenInfo 객체를 반환
        // 보안을 위해 Refresh Token은 null 처리
        return TokenInfo.builder()
                .grantType(tokenInfo.getGrantType())
                .accessToken(tokenInfo.getAccessToken())
                .refreshToken(null) // Refresh Token은 쿠키로 보냈으므로 응답 본문에서 제거
                .refreshTokenExpirationTime(tokenInfo.getRefreshTokenExpirationTime())
                .build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal UserDetails userDetails, HttpServletResponse response) {
        // 1. 서비스 로직 호출: DB에 저장된 Refresh Token 삭제
    	if (userDetails != null) {
    		authService.deleteRefreshToken(userDetails.getUsername());
    	}

        // 2. Refresh Token이 담긴 HttpOnly 쿠키 삭제
        CookieUtils.deleteCookie(response, "refreshToken");
        
        // 3. 성공 응답 반환
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/check")
    public ResponseEntity<Void> check(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName() + " = " + cookie.getValue());
            }
        }
        return ResponseEntity.ok().build();
    }
    
}
