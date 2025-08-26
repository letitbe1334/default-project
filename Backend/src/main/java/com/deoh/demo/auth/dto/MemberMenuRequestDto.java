package com.deoh.demo.auth.dto;

import com.deoh.demo.config.common.BaseRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberMenuRequestDto extends BaseRequest {

    private Long memberId;

}
