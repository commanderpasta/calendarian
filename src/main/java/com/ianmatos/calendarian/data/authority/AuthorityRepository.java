package com.ianmatos.calendarian.data.authority;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AuthorityRepository extends JpaRepository<Authorities, AuthorityId>{
    List<Authorities> findAllByOrderByUsernameAsc();
}

