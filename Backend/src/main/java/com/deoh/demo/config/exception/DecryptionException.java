package com.deoh.demo.config.exception;

public class DecryptionException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DecryptionException(String message, Throwable cause) {
        super(message, cause);
    }
}
