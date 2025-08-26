package com.deoh.demo.config.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommonResponseDto<T> {
    private boolean success;
    private String message;
    private T data;

    // 성공 메시지와 데이터를 포함하는 정적 팩토리 메서드
    public static <T> CommonResponseDto<T> success(String message, T data) {
        return new CommonResponseDto<>(true, message, data);
    }
    
    // 데이터만 포함하는 정적 팩토리 메서드
    public static <T> CommonResponseDto<T> success(T data) {
    	return new CommonResponseDto<>(true, "성공", data);
    }

    // 성공 메시지만 포함하는 정적 팩토리 메서드
    public static <T> CommonResponseDto<T> success(String message) {
        return new CommonResponseDto<>(true, message, null);
    }
    
    // 정적 팩토리 메서드
    public static <T> CommonResponseDto<T> success() {
    	return new CommonResponseDto<>(true, "성공", null);
    }
}
