package com.deoh.demo.config.jwt.repository;

import org.springframework.data.repository.CrudRepository;

import com.deoh.demo.config.jwt.RefreshToken;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    // email을 키로 RefreshToken을 찾기 위한 메서드
    // CrudRepository의 findById(String email)를 사용해도 됨
    // Optional<RefreshToken> findByEmail(String email);
	
}
