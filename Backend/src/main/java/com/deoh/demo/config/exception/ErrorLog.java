package com.deoh.demo.config.exception;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.deoh.demo.config.common.BaseAuditingEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "error_log")
@EntityListeners(AuditingEntityListener.class)
public class ErrorLog extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long errorLogId;

    private Long memberId;

    private String errorCode;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    @Column(columnDefinition = "TEXT")
    private String stackTrace;

    private String requestUri;

    private String requestMethod;

    @Column(columnDefinition = "TEXT")
    private String requestBody;

    @Builder
    public ErrorLog(Long memberId, String errorCode, String errorMessage, String stackTrace, String requestUri, String requestMethod, String requestBody) {
        this.memberId = memberId;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.stackTrace = stackTrace;
        this.requestUri = requestUri;
        this.requestMethod = requestMethod;
        this.requestBody = requestBody;
    }
}
