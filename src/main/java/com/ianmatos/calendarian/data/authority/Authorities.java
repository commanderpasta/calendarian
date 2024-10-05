package com.ianmatos.calendarian.data.authority;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "authorities")
@IdClass(AuthorityId.class)
public class Authorities {
  @Id
  String username;
  @Id
  String authority;
}