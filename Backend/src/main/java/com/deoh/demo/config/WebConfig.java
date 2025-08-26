package com.deoh.demo.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.deoh.demo.config.security.XssCharacterEscapes;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	
    @Value("${lang.jsonUrl}")
    private String jsonUrl;

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(0, new MappingJackson2HttpMessageConverter(jacksonObjectMapper()));
    }

    private ObjectMapper jacksonObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.registerModule(new JavaTimeModule());
        
        // --- XSS 방어 로직 추가 ---
        // ObjectMapper에 커스텀 CharacterEscapes 적용
        objectMapper.getFactory().setCharacterEscapes(new XssCharacterEscapes());
        
        return objectMapper;
    }

    @CacheEvict
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
        registry.addResourceHandler("/image/**").addResourceLocations("classpath:/static/image/");
        
        registry.addResourceHandler("/json/lang/**").addResourceLocations(jsonUrl);
    }
}
