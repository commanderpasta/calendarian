package com.ianmatos.calendarian.data.authority;

import java.util.Objects;

public class AuthorityId {
  private String username;
  private String authority;

  public AuthorityId(String username, String authority) {
    this.username = username;
    this.authority = authority;
  }

  @Override
  public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      AuthorityId that = (AuthorityId) o;
      return Objects.equals(username, that.username) &&
             Objects.equals(authority, that.authority);
  }

  @Override
  public int hashCode() {
      return Objects.hash(username, authority);
  }

  // Getters and setters
  public String getUsername() {
      return username;
  }

  public void setUsername(String username) {
      this.username = username;
  }

  public String getAuthority() {
      return authority;
  }

  public void setAuthority(String authority) {
      this.authority = authority;
  }
}