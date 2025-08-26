package com.deoh.demo.auth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "member_authority")
@IdClass(MemberAuthorityId.class) // 복합 키를 사용
public class MemberAuthority {

    @Id
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Id
    @ManyToOne
    @JoinColumn(name = "authority_id")
    private Authority authority;

    public MemberAuthority() {}

    public MemberAuthority(Member member, Authority authority) {
        this.member = member;
        this.authority = authority;
    }
    
    // Getter, Setter
}
