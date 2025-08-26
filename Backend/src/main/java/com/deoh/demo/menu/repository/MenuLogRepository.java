package com.deoh.demo.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deoh.demo.menu.entity.MenuLog;

@Repository
public interface MenuLogRepository extends JpaRepository<MenuLog, Long> {
}
