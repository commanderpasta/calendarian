package com.ianmatos.calendarian.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;


import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nonnull;

import jakarta.annotation.security.PermitAll;

@BrowserCallable
public class UserInfoService {
    public record UserInfoRecord(
            String name,
            List<String> authorities
    ) {
    }

    @PermitAll
    @Nonnull
    public UserInfoRecord getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();

        final List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new UserInfoRecord(auth.getName(), authorities);
    }

}