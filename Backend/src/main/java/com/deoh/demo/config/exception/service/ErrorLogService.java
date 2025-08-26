package com.deoh.demo.config.exception.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.deoh.demo.config.exception.ErrorLog;
import com.deoh.demo.config.exception.ErrorLogRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ErrorLogService {

    private final ErrorLogRepository errorLogRepository;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW) // 부모쪽에서 롤백이 되어도 무조건 커밋이 보장되게 처리
    public void saveErrorLog(ErrorLog errorLog) {
        try {
            errorLogRepository.save(errorLog);
        } catch (Exception e) {
            // DB 저장 실패 시, 콘솔에만 로그를 남김
            log.error("Failed to save error log to DB: {}", e.getMessage());
        }
    }

}
