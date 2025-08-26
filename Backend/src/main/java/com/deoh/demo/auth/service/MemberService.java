package com.deoh.demo.auth.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.deoh.demo.auth.dto.MemberRequestDto;
import com.deoh.demo.auth.dto.MemberResponseDto;
import com.deoh.demo.auth.entity.Member;
import com.deoh.demo.auth.repository.MemberRepository;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 반환 타입을 MemberResponseDto로 변경
    public MemberResponseDto registerNewMember(MemberRequestDto requestDto) {
        // 1. 비밀번호 암호화 및 엔티티 생성 (이전과 동일)
        Member member = requestDto.toMember(passwordEncoder);

        // 2. save()를 통해 DB에 저장하고, 저장된 엔티티를 반환받음
        Member savedMember = memberRepository.save(member);
        
        // 3. 저장된 엔티티를 MemberResponseDto로 변환하여 반환
        return MemberResponseDto.of(savedMember);
    }
    
    public MemberResponseDto getMemberInfo(Long memberId) {
    	Optional<Member> member = this.findMemberById(memberId);
    	return MemberResponseDto.of(member.get());
    }

    public Optional<Member> findMemberById(Long id) {
        // findById() 메서드도 JpaRepository에서 제공
        return memberRepository.findById(id);
    }

}
