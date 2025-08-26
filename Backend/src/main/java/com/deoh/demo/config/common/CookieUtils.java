package com.deoh.demo.config.common;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtils {

    public static void deleteCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null); // 값은 null로 설정
        cookie.setMaxAge(0); // 만료 시간을 0으로 설정하여 즉시 삭제
        cookie.setPath("/"); // 쿠키의 경로를 설정
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // HTTPS 환경일 경우 반드시 추가
        response.addCookie(cookie);
    }
    
}
