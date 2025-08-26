package com.deoh.demo.config.exception;

/**
 * 파일 처리와 관련된 모든 예외를 묶어서 던지기 위한 커스텀 예외 클래스입니다.
 */
public class FileProcessingException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public FileProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
