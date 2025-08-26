package com.deoh.demo.auth.entity;

import java.io.Serializable;
import java.util.Objects;

public class MemberAuthorityId implements Serializable {
	
	private static final long serialVersionUID = 1L;
    private Member member;
    private Authority authority;

    public MemberAuthorityId() {}

    public MemberAuthorityId(Authority authority, Member member) {
        this.authority = authority;
        this.member = member;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberAuthorityId that = (MemberAuthorityId) o;
        return Objects.equals(authority, that.authority) &&
               Objects.equals(member, that.member);
    }

    @Override
    public int hashCode() {
        return Objects.hash(authority, member);
    }
}
