package com.deoh.demo.config.exception;

import lombok.Getter;

@Getter
public class CustomJwtException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private final ErrorCode errorCode;

    public CustomJwtException(ErrorCode errorCode) {
        super(errorCode.getMessage()); // ErrorCode의 메시지를 사용
        this.errorCode = errorCode;
    }
}
