package com.deoh.demo.lang.dto;

import com.deoh.demo.lang.entitiy.LanguageMessage;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LanguageMessageRequestDto {

    private Long languageMessageId;
    private String languageKey;
    private String languageKr;
    private String languageEn;
    private String languageJa;
    private String languageZhCn;
    private String languageZhTw;
    private String useFlag;
    private String lang;

    public LanguageMessage toLanguageMessage() {
        return LanguageMessage.builder()
        		.languageMessageId(languageMessageId)
                .languageKey(languageKey)
                .languageKr(languageKr)
                .languageEn(languageEn)
                .languageJa(languageJa)
                .languageZhCn(languageZhCn)
                .languageZhTw(languageZhTw)
                .useFlag(useFlag)
                .build();
    }

	public LanguageMessageRequestDto(String lang) {
		super();
		this.lang = lang;
	}
    
}
