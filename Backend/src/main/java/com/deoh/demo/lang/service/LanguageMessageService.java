package com.deoh.demo.lang.service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deoh.demo.config.common.JsonUtil;
import com.deoh.demo.config.exception.FileProcessingException;
import com.deoh.demo.lang.dto.LanguageMessageRequestDto;
import com.deoh.demo.lang.entitiy.LanguageMessage;
import com.deoh.demo.lang.mapper.LanguageMessageMapper;
import com.deoh.demo.lang.repository.LangaugeMessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LanguageMessageService {

    @Value("${lang.jsonFilePath}")
    private String path;

    private final LangaugeMessageRepository langaugeMessageRepository;
    private final LanguageMessageMapper languageMessageMapper;
    
    @Transactional
    public LanguageMessage saveLanguageMessage(LanguageMessageRequestDto requestDto) {
    	LanguageMessage lm = requestDto.toLanguageMessage();
    	return langaugeMessageRepository.save(lm);
    }
    
    @Transactional
    public void deleteLanguageMessage(Long languageMessageId) {
    	langaugeMessageRepository.deleteById(languageMessageId);
    }
    
    public void generatorLanguageMessageJson() {
    	String[] langs = new String[] { "kr", "en", "ja", "zh_cn", "zh_tw" };
    	for (String lang : langs) {
    		this.updateLangJson(JsonUtil.getJsonStringFromList(languageMessageMapper.getLanguageMessagesJson(new LanguageMessageRequestDto(lang))), lang, "language");
    	}
    }
    
    /**
     * JSON 배열을 특정 경로에 파일로 저장합니다.
     * 이 메서드는 파일 및 디렉토리 생성, 그리고 I/O 리소스 관리를 안전하게 처리합니다.
     *
     * @param path      파일을 저장할 기본 디렉토리 경로
     * @param jsonArray 저장할 JSON 데이터 배열
     * @param lang      언어 코드 (예: "ko", "en")
     * @param gubun     구분자 (예: "service", "common")
     */
    public void updateLangJson(JSONArray jsonArray, String lang, String gubun) throws FileProcessingException {
        // 1. Path 객체를 사용하여 경로를 안전하게 구성합니다.
        Path directoryPath = Paths.get(path);
        
        try {
            // 2. 디렉토리가 없으면 생성합니다.
            // Files.createDirectories()는 상위 디렉토리도 함께 생성하며, 이미 존재하면 아무것도 하지 않습니다.
            // 이 메서드는 예외를 던지므로 try-catch로 처리합니다.
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
        } catch (IOException e) {
            // 디렉토리 생성 실패 시 예외 처리
            throw new FileProcessingException("디렉토리 생성에 실패했습니다: " + directoryPath.toString(), e);
        }

        // 3. 파일 전체 경로를 Path 객체로 생성합니다.
        // File.separator를 사용하여 OS에 독립적인 경로를 구성합니다.
        File file = new File(path + File.separator + lang + "_" + gubun + ".json");
        
        // 4. try-with-resources 구문을 사용하여 FileWriter를 자동으로 닫습니다.
        // 이를 통해 자원 누수와 NullPointerException을 방지할 수 있습니다.
        try (FileWriter fileWriter = new FileWriter(file)) {
            fileWriter.write(jsonArray.toJSONString());
            // flush()는 try-with-resources가 자동으로 처리하므로 생략 가능합니다.
        } catch (IOException e) {
            // 파일 쓰기 실패 시 예외 처리
            throw new FileProcessingException("파일 쓰기 중 오류가 발생했습니다: " + file.getAbsolutePath(), e);
        }
    }
}
