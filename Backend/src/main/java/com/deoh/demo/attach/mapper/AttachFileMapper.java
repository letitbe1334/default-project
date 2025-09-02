package com.deoh.demo.attach.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.deoh.demo.attach.dto.AttachFileRequestDto;
import com.deoh.demo.attach.entity.AttachFile;

@Mapper
public interface AttachFileMapper {
	
	List<AttachFile> getAttachFiles(AttachFileRequestDto requestDto);
	AttachFile getAttachFile(AttachFileRequestDto requestDto);
	int updateAttachFile(AttachFile Attach);
	int deleteAttachFile(@Param("sysAttachFileId") String sysAttachFileId);
	int deleteAttachFiles(@Param("taskKey") String taskKey, @Param("taskClassCd") String taskClassCd);

}
