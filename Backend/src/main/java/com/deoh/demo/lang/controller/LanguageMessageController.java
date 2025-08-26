package com.deoh.demo.lang.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deoh.demo.config.common.CommonResponseDto;
import com.deoh.demo.lang.dto.LanguageMessageRequestDto;
import com.deoh.demo.lang.entitiy.LanguageMessage;
import com.deoh.demo.lang.service.LanguageMessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/lang")
@RequiredArgsConstructor
public class LanguageMessageController {

	private final LanguageMessageService languageService;

    @PostMapping("/message")
    public ResponseEntity<CommonResponseDto<LanguageMessage>> insertLanguageMessage(@RequestBody LanguageMessageRequestDto requestDto) {
        return ResponseEntity.ok(CommonResponseDto.success(languageService.saveLanguageMessage(requestDto)));
    }
    
    @PutMapping("/message")
    public ResponseEntity<CommonResponseDto<LanguageMessage>> updateLanguageMessage(@RequestBody LanguageMessageRequestDto requestDto) {
    	return ResponseEntity.ok(CommonResponseDto.success(languageService.saveLanguageMessage(requestDto)));
    }
    
    @DeleteMapping("/message/{languageMessageId}")
    public ResponseEntity<CommonResponseDto<?>> deleteLanguageMessage(@PathVariable Long languageMessageId) {
    	languageService.deleteLanguageMessage(languageMessageId);
    	return ResponseEntity.ok(CommonResponseDto.success());
    }

    @GetMapping("/message/json")
    public ResponseEntity<CommonResponseDto<?>> generatorLanguageMessageJson() {
    	languageService.generatorLanguageMessageJson();
        return ResponseEntity.ok(CommonResponseDto.success());
    }

}
