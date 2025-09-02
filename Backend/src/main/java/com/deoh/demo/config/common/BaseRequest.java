package com.deoh.demo.config.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//공통 요청 DTO로, 모든 API 요청에 필요한 공통 파라미터를 정의합니다.
@Getter
@Setter
@NoArgsConstructor
public class BaseRequest {

 // 다국어 처리를 위한 언어 코드 (예: ko, en)
 private String lang;

 // 페이지네이션을 위한 현재 페이지 번호
 private Integer page;

 // 페이지네이션을 위한 페이지 당 데이터 수
 private Integer size;

 // 정렬을 위한 필드명 (예: "createdAt,desc")
 private String sort;
 
 // 등록자
 private Long regId;
 
 // 수정자
 private Long modId;
}
