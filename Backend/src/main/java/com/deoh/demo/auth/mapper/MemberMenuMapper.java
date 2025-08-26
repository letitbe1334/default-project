package com.deoh.demo.auth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.deoh.demo.auth.dto.MemberMenuDto;
import com.deoh.demo.auth.dto.MemberMenuRequestDto;

@Mapper
public interface MemberMenuMapper {
	
    List<MemberMenuDto> getMemberMenus(MemberMenuRequestDto requestDto);

}
