package com.deoh.demo.lang.entitiy;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.deoh.demo.config.common.BaseAuditingEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "language_message")
@DynamicInsert
@DynamicUpdate
public class LanguageMessage extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "language_message_id", nullable = false)
    private Long languageMessageId;

    @Column(name = "language_key", length = 1000, nullable = false)
    private String languageKey;

    @Column(name = "language_kr", length = 1000, nullable = false)
    private String languageKr;

    @Column(name = "language_en", length = 1000)
    private String languageEn;

    @Column(name = "language_ja", length = 1000)
    private String languageJa;

    @Column(name = "language_zh_cn", length = 1000)
    private String languageZhCn;

    @Column(name = "language_zh_tw", length = 1000)
    private String languageZhTw;

    @Column(name = "use_flag", length = 1)
    private String useFlag;
    
    @Transient
    private String languageText;

    @Builder
	public LanguageMessage(Long languageMessageId, String languageKey, String languageKr, String languageEn,
			String languageJa, String languageZhCn, String languageZhTw, String useFlag, String languageText) {
		this.languageMessageId = languageMessageId;
		this.languageKey = languageKey;
		this.languageKr = languageKr;
		this.languageEn = languageEn;
		this.languageJa = languageJa;
		this.languageZhCn = languageZhCn;
		this.languageZhTw = languageZhTw;
		this.useFlag = useFlag;
		this.languageText = languageText;
	}
    
    
}

