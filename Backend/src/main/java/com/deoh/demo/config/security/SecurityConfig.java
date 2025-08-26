package com.deoh.demo.config.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.deoh.demo.config.jwt.JwtAuthenticationEntryPoint;
import com.deoh.demo.config.jwt.JwtAuthenticationFilter;
import com.deoh.demo.config.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

/**
 * @용도 Spring Security의 전반적인 동작을 설정하는 핵심 파일
 * @역할 HttpSecurity를 설정하여 요청에 대한 접근 제어(authorizeHttpRequests) 규칙을 정의. (예: permitAll(), authenticated())
       세션 관리 정책(stateless)을 설정하여 JWT 기반 인증에 적합한 환경을 만듬.
       JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 이전에 추가하여 JWT 기반 인증이 먼저 처리되도록 함.
 * @author kdh
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    /**
     * Spring Security의 인증 시스템이 정상적으로 동작하기 위한 필수적인 의존성을 제공하기 위함
     * 사용자의 비밀번호를 안전하게 검증하기 위해 어떤 암호화 방식을 사용할지 Spring Security에게 알려주는 역할을 수행
     * 
     * 이를 수행되기 위한 순서
     *  1. AuthController POST "/api/auth/login"로 진입
     *  2. AuthService의 login에서 UsernamePasswordAuthenticationToken을 생성 후 AuthenticationManager로 전달
     *    (* AuthenticationManager로 전달하는 부분은 authenticationManagerBuilder.getObject().authenticate(authenticationToken)에서 authenticate가 실행되는 부분임
     *  3. authenticate가 실행되면 ProviderManager는 전달받은 authenticationToken을 처리할 수 있는 AuthenticationProvider를 찾음
     *    (* 여기서 provider는 Spring Security에서 기본적으로 제공되는 DaoAuthenticationProvider(AuthenticationProvider)임)
     *  4. DaoAuthenticationProvider는 자신이 가지고 있는 UserDetailsService를 사용해 사용자 정보를 조회하여 UserDetails 객체 반환
     *    (* 여기서 "UserDetailsService를 사용해 사용자 정보를 조회"는 CustomUserDetailsService의 loadUserByUsername 메서드임)
     *  5. DaoAuthenticationProvider는 두 개의 비밀번호를 PasswordEncoder를 통해 비교하여 일치하는지를 확인
     *    (* 여기서 두 개의 비밀번호는 처음에 넘겨받은 UsernamePasswordAuthenticationToken에 담겨있는 비밀번호와 loadUserByUsername를 통해 반환받은 UserDetails 객체에 있는 비밀번호)
     *  6. 일치하면 DaoAuthenticationProvider는 Authentication 객체를 AuthenticationManager에게 반환
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	http
    		/**
    		 * httpBasic() : HTTP Basic 인증 방식을 비활성화.
    		 * HTTP Basic은 사용자 이름과 비밀번호를 평문으로 주고받기 때문에, 토큰 기반 인증(JWT)을 사용하는 REST API에서는 보안상 비활성화합니다.
    		 */
	        .httpBasic(AbstractHttpConfigurer::disable)
	        /**
	         * csrf() : CSRF(Cross-Site Request Forgery) 보호 기능을 비활성화.
	         * JWT를 사용하는 REST API는 세션을 사용하지 않기 때문에 CSRF 공격으로부터 안전하며 CSRF 토큰을 매번 주고받는 오버헤드를 줄이기 위해 비활성화합니다
	         */
	        .csrf(AbstractHttpConfigurer::disable)
	        /**
	         * sessionManagement() : 세션 관리 정책을 설정
	         * JWT는 세션에 의존하지 않는 무상태(Stateless) 토큰이므로, 서버가 세션을 생성하거나 사용하지 않도록 STATELESS로 설정
	         */
	        .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        /** authorizeHttpRequests() : 요청에 대한 인가(접근 권한) 규칙을 설정합니다. */
	        .authorizeHttpRequests(authorizeRequests ->
	                authorizeRequests
	                    .requestMatchers("/api/auth/login").permitAll()
	                    .requestMatchers("/api/auth/logout").permitAll()
	                    .requestMatchers("/api/auth/refresh").permitAll()
	                    .requestMatchers("/api/auth/register").permitAll()
	                    .requestMatchers("/api/auth/signup").permitAll()
	                    .requestMatchers("/json/lang/**").permitAll()
	                    .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**").permitAll()
	                    // 위의 규칙에 해당하지 않는 모든 나머지 요청은 반드시 인증을 거쳐야만 접근을 허용.
	                    .anyRequest().authenticated()
	        )
    		// 인증 예외 처리를 위한 Entry Point 등록
    		.exceptionHandling(exceptionHandling ->
    		    exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint)
    		)
            // CORS 설정
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        /**
	         * addFilterBefore() : 커스텀 필터를 스프링 시큐리티 필터 체인에 추가
	         * JWT 토큰이 유효한지 먼저 확인하여 인증을 처리하기 위해 직접 만든 JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter가 동작하기 이전에 실행되도록 설정
	         */
	        .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        /**
         * 현재 환경은 dev 환경에서만 실행함으로 전부 허용
         */
        
        // 모든 출처(Origin) 허용
        configuration.setAllowedOrigins(List.of("http://localhost:50000"));
        // 모든 HTTP 메서드 허용 (GET, POST, PUT, DELETE 등)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // 모든 헤더 허용
        configuration.setAllowedHeaders(List.of("*"));
        // 인증 정보(쿠키, 헤더)를 포함한 요청 허용
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 경로에 대해 위 설정 적용
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
    
}
