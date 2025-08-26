package com.deoh.demo.config.exception;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.ContentCachingRequestWrapper;

import com.deoh.demo.config.exception.service.ErrorLogService;
import com.deoh.demo.config.jwt.JwtTokenProvider;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final ErrorLogService errorLogService;
    private final JwtTokenProvider jwtTokenProvider;

    // JWT 토큰을 Http 요청 헤더에서 추출하는 헬퍼 메서드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // JWT 토큰에서 memberId를 추출하는 헬퍼 메서드
    private Long getMemberIdFromToken(HttpServletRequest request) {
        String token = resolveToken(request);
        if (token != null) {
            try {
                // validateToken 메서드가 true를 반환하면(유효), ID를 추출
                if (jwtTokenProvider.validateToken(token)) {
                    // 토큰의 subject를 Long 타입으로 변환
                    String subject = jwtTokenProvider.getSubject(token);
                    return Long.parseLong(subject);
                }
            } catch (ExpiredJwtException e) {
                // Access Token이 만료된 경우
                log.error("Expired JWT Token while getting member ID. URI: {}", request.getRequestURI());
            } catch (JwtException | IllegalArgumentException e) {
                // 그 외 모든 JWT 관련 예외가 발생한 경우 (유효하지 않은 토큰)
                log.error("Invalid JWT Token while getting member ID. URI: {}", request.getRequestURI());
            }
        }
        return null;
    }
    
    // 요청 바디를 읽어오는 헬퍼 메서드
    private String getRequestBody(HttpServletRequest request) {
        ContentCachingRequestWrapper wrapper = (ContentCachingRequestWrapper) request;
        if (wrapper == null) {
            return null;
        }
        try {
            byte[] buf = wrapper.getContentAsByteArray();
            return new String(buf, wrapper.getCharacterEncoding());
        } catch (IOException e) {
            log.error("Failed to read request body: {}", e.getMessage());
            return null;
        }
    }

    /*
     * CustomException 발생 시 처리
     */
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponse> handleCustomException(CustomException e, HttpServletRequest request) {
        log.error("CustomException Occurred: {} -> {}", e.getErrorCode(), e.getMessage());
        
        ErrorResponse response = ErrorResponse.builder()
                .httpStatus(e.getErrorCode().getHttpStatus())
                .code(e.getErrorCode().name())
                .message(e.getErrorCode().getMessage())
                .path(request.getRequestURI())
                .build();

        errorLogService.saveErrorLog(ErrorLog.builder()
                .memberId(getMemberIdFromToken(request))
                .errorCode(e.getErrorCode().name())
                .errorMessage(e.getMessage())
                .stackTrace(e.getStackTrace()[0].toString())
                .requestUri(request.getRequestURI())
                .requestMethod(request.getMethod())
                .requestBody(getRequestBody(request))
                .build());
                
        return new ResponseEntity<>(response, e.getErrorCode().getHttpStatus());
    }

    /*
     * @Valid를 사용한 DTO 유효성 검사 실패 시 처리
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request) {
        log.error("Validation Error: {}", e.getBindingResult().getFieldError().getDefaultMessage());
        
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        String errorMessage = e.getBindingResult().getFieldError().getDefaultMessage();
        
        ErrorResponse response = ErrorResponse.builder()
                .httpStatus(httpStatus)
                .code(httpStatus.name())
                .message(errorMessage)
                .path(request.getRequestURI())
                .build();

        // 유효성 검사 에러 로그 저장 로직 추가
        errorLogService.saveErrorLog(ErrorLog.builder()
                .memberId(getMemberIdFromToken(request))
                .errorCode(httpStatus.name())
                .errorMessage(errorMessage)
                .requestUri(request.getRequestURI())
                .requestMethod(request.getMethod())
                .requestBody(getRequestBody(request))
                .build());
                
        return new ResponseEntity<>(response, httpStatus);
    }
    
    /*
     * 401 Unauthorized 에러 처리 (Spring Security에서 발생하는 인증 실패 예외)
     */
    @ExceptionHandler(AuthenticationException.class)
    protected ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException e, HttpServletRequest request) {
        log.error("Authentication Failed: {}", e.getMessage(), e);

        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        String errorMessage = "인증에 실패하였습니다.";

        ErrorResponse response = ErrorResponse.builder()
                .httpStatus(httpStatus)
                .code("UNAUTHORIZED")
                .message(errorMessage)
                .path(request.getRequestURI())
                .build();

        errorLogService.saveErrorLog(ErrorLog.builder()
                .memberId(getMemberIdFromToken(request))
                .errorCode("UNAUTHORIZED")
                .errorMessage(errorMessage)
                .stackTrace(e.getStackTrace()[0].toString())
                .requestUri(request.getRequestURI())
                .requestMethod(request.getMethod())
                .requestBody(getRequestBody(request))
                .build());

        return new ResponseEntity<>(response, httpStatus);
    }
    
    @ExceptionHandler(CustomJwtException.class)
    public ResponseEntity<ErrorResponse> handleCustomJwtException(CustomJwtException e, WebRequest request) {
        ErrorCode errorCode = e.getErrorCode();
        
        // ErrorResponse 빌더를 사용하여 객체 생성
        ErrorResponse errorResponse = ErrorResponse.builder()
                .httpStatus(errorCode.getHttpStatus())
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .path(((ServletWebRequest) request).getRequest().getRequestURI()) // 요청 경로를 가져와 설정
                .build();
                
        return ResponseEntity.status(errorCode.getHttpStatus()).body(errorResponse);
    }
    
    /*
     * 403 Forbidden 에러 처리 (Spring Security에서 발생하는 권한 부족 예외)
     */
    @ExceptionHandler(AccessDeniedException.class)
    protected ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException e, HttpServletRequest request) {
        log.error("Access Denied: {}", e.getMessage(), e);

        HttpStatus httpStatus = HttpStatus.FORBIDDEN;
        String errorMessage = "접근 권한이 없습니다.";

        ErrorResponse response = ErrorResponse.builder()
                .httpStatus(httpStatus)
                .code("FORBIDDEN")
                .message(errorMessage)
                .path(request.getRequestURI())
                .build();

        errorLogService.saveErrorLog(ErrorLog.builder()
                .memberId(getMemberIdFromToken(request))
                .errorCode("FORBIDDEN")
                .errorMessage(errorMessage)
                .stackTrace(e.getStackTrace()[0].toString())
                .requestUri(request.getRequestURI())
                .requestMethod(request.getMethod())
                .requestBody(getRequestBody(request))
                .build());

        return new ResponseEntity<>(response, httpStatus);
    }
    
    /*
     * 모든 예상치 못한 예외 처리 (500번대 에러)
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleAllExceptions(Exception e, HttpServletRequest request) {
        log.error("Internal Server Error: {}", e.getMessage(), e);
        
        ErrorCode errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
        
        ErrorResponse response = ErrorResponse.builder()
                .httpStatus(errorCode.getHttpStatus())
                .code(errorCode.name())
                .message(errorCode.getMessage())
                .path(request.getRequestURI())
                .build();

        // 로그 저장 로직
        errorLogService.saveErrorLog(ErrorLog.builder()
                .memberId(getMemberIdFromToken(request))
                .errorCode(ErrorCode.INTERNAL_SERVER_ERROR.name())
                .errorMessage(e.getMessage())
                .stackTrace(e.getStackTrace()[0].toString())
                .requestUri(request.getRequestURI())
                .requestMethod(request.getMethod())
                .requestBody(getRequestBody(request))
                .build());
                
        return new ResponseEntity<>(response, errorCode.getHttpStatus());
    }

}
