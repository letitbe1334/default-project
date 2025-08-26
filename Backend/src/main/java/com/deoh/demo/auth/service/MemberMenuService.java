package com.deoh.demo.auth.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deoh.demo.auth.dto.MemberMenuDto;
import com.deoh.demo.auth.dto.MemberMenuRequestDto;
import com.deoh.demo.auth.dto.MemberMenuResponseDto;
import com.deoh.demo.auth.mapper.MemberMenuMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberMenuService {

    private final MemberMenuMapper memberMenuMapper;
    
    public List<MemberMenuResponseDto> getMemberMenus(MemberMenuRequestDto requestDto) {
    	List<MemberMenuDto> memberMenus = memberMenuMapper.getMemberMenus(requestDto);
    	return memberMenus.stream()
    			.map(MemberMenuResponseDto::of)
    			.collect(Collectors.toList());
    }
	
}
