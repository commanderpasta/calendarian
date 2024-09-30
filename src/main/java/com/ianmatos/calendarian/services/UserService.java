package com.ianmatos.calendarian.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nonnull;
import com.vaadin.hilla.exception.EndpointException;

import jakarta.annotation.security.PermitAll;
import jakarta.validation.constraints.NotNull;

@BrowserCallable
public class UserService {
    private final UserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;
    }

    @AnonymousAllowed
    public void register(@NotNull String username, @NotNull String password) {
        if(userDetailsManager.userExists(username)) {
            throw new EndpointException("User exists");
        }

        userDetailsManager.createUser(User.builder()
        .username(username)
        .password(passwordEncoder.encode(password))
        .roles("USER")
        .build());
        
        return;
    }

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
