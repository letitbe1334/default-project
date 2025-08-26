package com.deoh.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deoh.demo.auth.entity.Authority;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    
    // 권한명(authorityName)으로 Authority 엔티티를 조회하는 메서드
    // Spring Data JPA가 메서드 이름 규칙에 따라 자동으로 쿼리를 생성합니다.
    Optional<Authority> findByAuthorityName(String authorityName);
}

