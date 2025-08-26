package com.deoh.demo.config.jwt;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

/**
 * @용도 JWT 토큰을 생성, 복호화, 검증하는 핵심 로직을 담고 있는 유틸리티 클래스
 * @역할 generateToken(): 사용자의 인증 정보를 바탕으로 Access Token과 Refresh Token을 생성.
	   getAuthentication(): Access Token을 복호화하여 Spring Security의 Authentication 객체를 만듬. 이 객체는 사용자의 식별 정보와 권한을 담고 있어, 인증/인가 과정에 사용.
	   validateToken(): JWT 토큰의 유효성을 검증합니다. 만료 여부, 서명 위조 여부 등을 확인합니다.
 * @author kdh
 */
@Slf4j
@Component
public class JwtTokenProvider {

    private final SecretKey key; // Key -> SecretKey 타입으로 변경
    private final long ACCESS_TOKEN_EXPIRE_TIME;
    private final long REFRESH_TOKEN_EXPIRE_TIME;

    public JwtTokenProvider(JwtProperties jwtProperties) { // 생성자 수정
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecret());
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.ACCESS_TOKEN_EXPIRE_TIME = jwtProperties.getExpirationAccessToken();
        this.REFRESH_TOKEN_EXPIRE_TIME = jwtProperties.getExpirationRefreshToken();
    }

    // 유저 정보를 가지고 AccessToken, RefreshToken을 생성하는 메서드
    public TokenInfo generateToken(Authentication authentication) {
        // 권한 정보 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        long accessTokenExpireTime = now + ACCESS_TOKEN_EXPIRE_TIME;
		long refreshTokenExpireTime = now + REFRESH_TOKEN_EXPIRE_TIME;

        // Access Token 생성
        String accessToken = Jwts.builder()
                .subject(authentication.getName())
                .claim("auth", authorities)
                .expiration(new Date(accessTokenExpireTime))
                .signWith(key)
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .subject(authentication.getName())
                .expiration(new Date(refreshTokenExpireTime))
                .signWith(key)
                .compact();

        return TokenInfo.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpirationTime(accessTokenExpireTime)
                .refreshTokenExpirationTime(refreshTokenExpireTime)
                .build();
    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
    	/**
    	 * JWT : Header, payload, Signature로 구성됨. 이 중 payload에 들어가는 데이터가 Claims
    	 * Claims는 key-value로 이루어진 JSON 형태로 사용자에 대한 정보를 가지고 있음
    	 * Claims는 JWT토큰에 담겨 DB에 가지고 않고 사용자 정보를 전달하는 역할을 수행
    	 */
        // 토큰에서 Claim 추출
        Claims claims = parseClaims(accessToken);

        Object authClaim = claims.get("auth");

        Collection<? extends GrantedAuthority> authorities = Collections.emptyList(); // 기본값으로 빈 리스트 설정

        if (authClaim != null && StringUtils.hasText(authClaim.toString())) {
            authorities = Arrays.stream(authClaim.toString().split(","))
                    .map(String::trim) // 공백 제거
                    .filter(StringUtils::hasText) // 빈 문자열 필터링
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        }

        // 현재 인증된 사용자를 식별하는 주체 (현재 누가 시스템을 사용하고 있는지를 알려주는 이름)
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증하는 메서드
    // 토큰의 만료기간, 서명을 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // 모든 JWT 관련 예외 및 IllegalArgumentException을 한번에 처리하여 던짐
            // ExpiredJwtException도 JwtException의 하위 클래스이므로 여기에 포함됨
            throw e;
        }
//        catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//            log.info("Invalid JWT Token", e);
//        } catch (ExpiredJwtException e) {
//            log.info("Expired JWT Token", e);
//            throw e;
//        } catch (UnsupportedJwtException e) {
//            log.info("Unsupported JWT Token", e);
//        } catch (IllegalArgumentException e) {
//            log.info("JWT claims string is empty.", e);
//        }
    }

    // 토큰에서 Claim 추출하는 메서드
    public Claims parseClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // 토큰에서 사용자 ID(subject) 추출
    public String getSubject(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }

    /**
     * 토큰에서 사용자 ID를 추출하는 메서드
     */
    public Long getMemberId(String token) {
        try {
            // parseClaims에서 던져지는 예외를 여기서 처리하지 않고, 호출하는 쪽으로 전달
            Claims claims = parseClaims(token);
            return Long.parseLong(claims.getSubject());
        } catch (NumberFormatException e) {
            log.error("Failed to parse memberId from JWT subject: {}", getSubject(token));
            throw new RuntimeException("회원 ID 파싱에 실패했습니다.");
        }
    }

    public Long getExpiration(String token) {
        Claims claims = parseClaims(token);
        
        // 만료 시간 (Date)
        Date expiration = claims.getExpiration();
        
        // 현재 시간 (밀리초)
        long now = new Date().getTime();
        
        // 남은 시간 (밀리초)
        return expiration.getTime() - now;
    }
    
}
