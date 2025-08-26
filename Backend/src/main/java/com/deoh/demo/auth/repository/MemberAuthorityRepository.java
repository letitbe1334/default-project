package com.deoh.demo.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deoh.demo.auth.entity.Member;
import com.deoh.demo.auth.entity.MemberAuthority;
import com.deoh.demo.auth.entity.MemberAuthorityId;

@Repository
public interface MemberAuthorityRepository extends JpaRepository<MemberAuthority, MemberAuthorityId> {
	
    // 특정 회원의 모든 권한을 삭제하는 쿼리 메서드
    void deleteByMember(Member member);
    
}
