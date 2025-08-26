package com.deoh.demo.config.jwt;

import java.util.concurrent.TimeUnit;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash("refreshToken")
public class RefreshToken {

    @Id
    private Long memberId;

    private String refreshToken;

    @TimeToLive(unit = TimeUnit.SECONDS)
    private Long expiration;
}
