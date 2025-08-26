package com.deoh.demo.lang.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.deoh.demo.lang.dto.LanguageMessageRequestDto;

@Mapper
public interface LanguageMessageMapper {
	
	List<HashMap<String, Object>> getLanguageMessagesJson(LanguageMessageRequestDto requestDto);
	
}
