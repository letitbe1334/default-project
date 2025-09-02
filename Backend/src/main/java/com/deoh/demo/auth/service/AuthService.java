package com.deoh.demo.auth.service;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deoh.demo.auth.dto.MemberRequestDto;
import com.deoh.demo.auth.entity.Member;
import com.deoh.demo.auth.repository.MemberRepository;
import com.deoh.demo.config.exception.CustomException;
import com.deoh.demo.config.exception.CustomJwtException;
import com.deoh.demo.config.exception.ErrorCode;
import com.deoh.demo.config.jwt.JwtTokenProvider;
import com.deoh.demo.config.jwt.RefreshToken;
import com.deoh.demo.config.jwt.TokenInfo;
import com.deoh.demo.config.jwt.repository.RefreshTokenRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @용도 회원가입 및 로그인 비즈니스 로직을 처리하는 서비스 클래스
 * @역할 login(): 사용자가 제공한 아이디/비밀번호로 AuthenticationManager를 통해 인증을 시도합니다. 인증이 성공하면 JwtTokenProvider를 호출하여 토큰을 발급받습니다.
 * @author kdh
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void signup(MemberRequestDto requestDto) {
        // 1. 이메일 중복 체크
        if (memberRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
        }

        // 2. 닉네임 중복 체크
        if (memberRepository.findByNickname(requestDto.getNickname()).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_NICKNAME);
        }

        // 3. 기본 권한은 별도로 매핑하지 않음.
        //    권한이 없는 사용자가 로그인 시, 서비스 로직에서 '기본 권한'을 가진 것처럼 동작하도록 처리할 예정.
        //    추후 관리자 페이지에서 권한을 할당.

        // 4. DTO를 Member 엔티티로 변환하며, 비밀번호 인코딩 및 권한 할당
        Member member = Member.builder()
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .nickname(requestDto.getNickname())
                .build();

        // 5. 저장된 엔티티를 DTO로 변환하여 반환
        memberRepository.save(member);
    }

    public TokenInfo login(MemberRequestDto requestDto) {
        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 은 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword());

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
        tokenInfo.setRefreshTokenCookieExpirationTime(jwtTokenProvider.getExpiration(tokenInfo.getRefreshToken()) / 1000);

        // Redis에 Refresh Token 저장 (memberId를 키로 사용)
        Long memberId = Long.parseLong(authentication.getName());
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));


        // 4. Redis에 Refresh Token 저장
        // Redis에 저장된 Refresh Token은 토큰의 만료 시간과 동일하게 TTL을 설정.
        refreshTokenRepository.save(
            RefreshToken.builder()
            	.memberId(member.getMemberId())
                .refreshToken(tokenInfo.getRefreshToken())
                .expiration(tokenInfo.getRefreshTokenCookieExpirationTime())
                .build()
        );
        
        return tokenInfo;
    }
    
    @Transactional
    public TokenInfo refreshTokens(String refreshToken) {
        // 1. Refresh Token 유효성 검증
        try {
            // validateToken 메서드가 true를 반환하면 유효한 토큰
            jwtTokenProvider.validateToken(refreshToken);

        } catch (ExpiredJwtException e) {
            // Refresh Token이 만료된 경우
            log.error("Refresh token has expired: {}", refreshToken);
            throw new CustomJwtException(ErrorCode.REFRESH_TOKEN_EXPIRED);

        } catch (JwtException | IllegalArgumentException e) {
            // 그 외 Refresh Token이 유효하지 않은 경우 (변조, 형식 오류 등)
            log.error("Invalid refresh token: {}", refreshToken, e);
            throw new RuntimeException("Invalid refresh token. Please log in again.");
        }

        // 2. Redis에 Refresh Token이 존재하는지 확인 (memberId를 키로 사용)
        Claims claims = jwtTokenProvider.parseClaims(refreshToken);
        Long memberId = Long.parseLong(claims.getSubject()); // claims에서 memberId 추출
        
        RefreshToken storedRefreshToken = refreshTokenRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_REFRESH_TOKEN));
        
        // 3. 클라이언트가 보낸 토큰과 Redis에 저장된 토큰이 일치하는지 확인
        if (!storedRefreshToken.getRefreshToken().equals(refreshToken)) {
            throw new CustomException(ErrorCode.MISMATCH_REFRESH_TOKEN);
        }
        
        // --- 4. 새로운 Authentication 객체 생성 (수정된 부분) ---
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        Collection<? extends GrantedAuthority> authorities = member.getAuthorities().stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
            .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, "", authorities);
        
        // 5. 새로운 Access Token과 Refresh Token 생성
        TokenInfo newTokenInfo = jwtTokenProvider.generateToken(authentication);
        newTokenInfo.setRefreshTokenCookieExpirationTime(jwtTokenProvider.getExpiration(newTokenInfo.getRefreshToken()) / 1000);

        // 6. Redis에 새로운 Refresh Token 저장 (기존 토큰 덮어쓰기)
        refreshTokenRepository.save(
            RefreshToken.builder()
                .memberId(memberId)
                .refreshToken(newTokenInfo.getRefreshToken())
                .expiration(newTokenInfo.getRefreshTokenCookieExpirationTime())
                .build()
        );

        return newTokenInfo;
    }

    public void deleteRefreshToken(String email) {
        // email로 memberId를 찾아서 Redis에서 삭제
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
            
        refreshTokenRepository.findById(member.getMemberId())
            .ifPresent(refreshTokenRepository::delete);
    }
    
}
