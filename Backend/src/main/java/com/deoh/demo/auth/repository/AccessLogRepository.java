package com.deoh.demo.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deoh.demo.auth.entity.AccessLog;

@Repository
public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {
}
