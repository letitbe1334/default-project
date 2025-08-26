package com.deoh.demo.config.jwt;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.deoh.demo.config.exception.CustomJwtException;
import com.deoh.demo.config.exception.ErrorCode;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/**
 * @용도 모든 요청에 대해 JWT 토큰의 유효성을 검사하고, 유효한 토큰이라면 Spring Security Context에 인증 정보를 저장하는 필터
 * @역할 HTTP 요청 헤더에서 JWT 토큰을 추출.
       JwtTokenProvider를 사용해 토큰의 유효성을 검증.
       토큰이 유효하면 JwtTokenProvider를 통해 Authentication 객체를 얻어와 SecurityContextHolder에 저장.
       filterChain.doFilter()를 호출하여 다음 필터로 요청을 넘김.
 * @author kdh
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);
        

        try {
            // 토큰이 존재하고 유효한 경우, 정상적으로 인증 절차 수행
            if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                /**
                 * SecurityContextHolder : JwtAuthenticationFilter는 추출한 Claims를 바탕으로 Authentication 객체를 만들고, 이를 SecurityContextHolder에 저장
                 *  - Spring Security가 현재 인증된 사용자를 관리하는 핵심
                 *  - 스레드 로컬(ThreadLocal) 저장소에 인증 정보를 보관
                 *  - 웹 서버는 요청이 올 때마다 새로운 스레드를 할당하여 처리함
                 *  - SecurityContextHolder에 저장된 인증 정보는 해당 요청을 처리하는 스레드 내에서만 유효. 다른 요청의 스레드와는 완전히 분리
                 */
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (ExpiredJwtException e) {
            // Access Token이 만료된 경우
            throw new CustomJwtException(ErrorCode.TOKEN_EXPIRED);
        } catch (JwtException | IllegalArgumentException e) {
            // 그 외 JWT 관련 예외, 커스텀 예외를 발생
            throw new CustomJwtException(ErrorCode.INVALID_TOKEN);
        }
        
        /**
         * SecurityConfig에서 httpSecurity의 addFilterBefore로 JwtAuthenticationFilter가 먼저 동작하도록 처리
         * 아래 문구를 통해 다음 필터를 수행하게 처리
         */
        filterChain.doFilter(request, response); 
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7); // Bearer 다음부터
        }
        return null;
    }
    
}
