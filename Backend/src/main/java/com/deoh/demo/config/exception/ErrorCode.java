package com.deoh.demo.config.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    /* 400 BAD_REQUEST : 잘못된 요청 */
    INVALID_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "A001", "리프레시 토큰이 유효하지 않습니다"),
    MISMATCH_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "A002", "리프레시 토큰의 유저 정보가 일치하지 않습니다"),
    DUPLICATE_EMAIL(HttpStatus.BAD_REQUEST, "A003", "이미 존재하는 이메일입니다"),
    DUPLICATE_NICKNAME(HttpStatus.BAD_REQUEST, "A004", "이미 존재하는 닉네임입니다"),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "B001", "권한 정보가 없는 토큰입니다"),
    UNAUTHORIZED_MEMBER(HttpStatus.UNAUTHORIZED, "B002", "현재 내 계정 정보가 존재하지 않습니다"),
    
    // JWT 인증 필터에서 사용할 토큰 만료 에러 코드 추가
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "B003", "Access token has expired."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "B004", "Invalid or malformed JWT token."),

    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "C001", "해당 유저 정보를 찾을 수 없습니다"),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "C002", "로그아웃 된 사용자입니다"),

    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "D001", "데이터가 이미 존재합니다"),
    
    /* 500 INTERNAL_SERVER_ERROR : 서버 내부 오류 */
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E001", "서버에서 오류가 발생했습니다"),
    
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
    
}
