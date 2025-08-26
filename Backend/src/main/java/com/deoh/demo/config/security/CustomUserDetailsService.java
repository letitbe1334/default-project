package com.deoh.demo.config.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deoh.demo.auth.entity.Authority;
import com.deoh.demo.auth.entity.Member;
import com.deoh.demo.auth.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

/**
 * @용도 DB에서 사용자 정보를 조회하여 Spring Security의 UserDetails 객체로 변환하는 역할을 함
 * @역할 loadUserByUsername() 메서드를 구현하여 MemberRepository를 통해 DB에서 사용자를 찾음.
       조회된 Member 엔티티 정보를 바탕으로 UserDetails 객체를 생성하여 반환. 이 UserDetails 객체는 Authentication 객체의 Principal로 사용.
 * @author kdh
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. 이메일로 회원 정보 조회. 회원 정보가 없을 경우 예외 발생
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("회원을 찾을 수 없습니다."));

        // 2. 회원에게 부여된 권한들을 가져옵니다.
        Set<Authority> authorities = member.getAuthorities();

        // 3. GrantedAuthority 컬렉션 초기화
        Collection<GrantedAuthority> grantedAuthorities = new HashSet<>();

        // 4. 회원에게 할당된 권한이 없는 경우, 기본 권한(ROLE_USER)을 동적으로 부여
        if (authorities.isEmpty()) {
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        } else {
            // 5. 권한이 있는 경우, 권한들을 GrantedAuthority로 변환하여 할당
            grantedAuthorities = authorities.stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
                .collect(Collectors.toSet());
        }

        // 6. Spring Security의 User 객체를 생성하여 반환
        return new User(String.valueOf(member.getMemberId()), member.getPassword(), grantedAuthorities);
    }
}
