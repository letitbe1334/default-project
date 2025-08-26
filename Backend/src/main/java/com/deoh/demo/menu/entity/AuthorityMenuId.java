package com.deoh.demo.menu.entity;

import java.io.Serializable;
import java.util.Objects;

import com.deoh.demo.auth.entity.Authority;

public class AuthorityMenuId implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Authority authority;
    private Menu menu;

    public AuthorityMenuId() {}

    public AuthorityMenuId(Authority authority, Menu menu) {
        this.authority = authority;
        this.menu = menu;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthorityMenuId that = (AuthorityMenuId) o;
        return Objects.equals(authority, that.authority) &&
               Objects.equals(menu, that.menu);
    }

    @Override
    public int hashCode() {
        return Objects.hash(authority, menu);
    }
}
