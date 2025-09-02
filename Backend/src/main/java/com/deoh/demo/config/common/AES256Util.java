package com.deoh.demo.config.common;

import java.nio.charset.StandardCharsets;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.EncoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.net.URLCodec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.deoh.demo.config.exception.DecryptionException;
import com.deoh.demo.config.exception.EncryptionException;

@Component
public class AES256Util {

    private final SecretKeySpec keySpec;
    private final IvParameterSpec ivSpec;

    public AES256Util(@Value("${aes.iv}") String iv, @Value("${aes.sk}") String secretKey) {
        this.keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "AES");
        this.ivSpec = new IvParameterSpec(iv.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * AES256 바이너리 암호화
     */
    public byte[] aesEncode(byte[] bytes) {
        try {
            Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
            c.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
            return c.doFinal(bytes);
        } catch (Exception e) {
            throw new EncryptionException("AES 인코딩 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * AES256 바이너리 복호화
     */
    public byte[] aesDecode(byte[] bytes) {
        try {
            Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
            c.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
            return c.doFinal(bytes);
        } catch (Exception e) {
            throw new DecryptionException("AES 디코딩 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * AES256 문자열 암호화
     */
    public String aesEncode(String str) {
        if (str == null || str.isBlank()) {
            return str;
        }
        byte[] encryptedBytes = aesEncode(str.getBytes(StandardCharsets.UTF_8));
        return Base64.encodeBase64String(encryptedBytes);
    }

    /**
     * AES256 문자열 복호화
     */
    public String aesDecode(String str) {
        if (str == null || str.isBlank()) {
            return str;
        }
        byte[] decryptedBytes = aesDecode(Base64.decodeBase64(str));
        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }
    
    /**
     * URL 인코딩 + AES256 암호화
     */
    public String fullEncode(String str) {
        if (str == null || str.isBlank()) {
            return str;
        }
        try {
            return new URLCodec(StandardCharsets.UTF_8.name()).encode(aesEncode(str));
        } catch (EncoderException e) {
            throw new EncryptionException("URL 인코딩 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * URL 인코딩 + AES256 복호화
     */
    public String fullDecode(String str) {
        if (str == null || str.isBlank()) {
            return str;
        }
        try {
            return aesDecode(new URLCodec(StandardCharsets.UTF_8.name()).decode(str));
        } catch (DecoderException e) {
            throw new DecryptionException("URL 디코딩 중 오류가 발생했습니다.", e);
        }
    }
}

