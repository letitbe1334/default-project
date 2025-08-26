package com.deoh.demo.lang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deoh.demo.lang.entitiy.LanguageMessage;

@Repository
public interface LangaugeMessageRepository extends JpaRepository<LanguageMessage, Long> {

}
