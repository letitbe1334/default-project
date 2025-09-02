package com.deoh.demo.attach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deoh.demo.attach.entity.AttachFile;

@Repository
public interface AttachFileRepository extends JpaRepository<AttachFile, Long> {

}
