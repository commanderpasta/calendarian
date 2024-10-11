package com.ianmatos.calendarian.services;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.validator.constraints.Length;
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
import jakarta.validation.constraints.Pattern;

@BrowserCallable
public class UserService {
    private final UserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;
    }

    public record UserInfoRecord(
        @Nonnull
        String name,
        @Nonnull
        List<@Nonnull String> authorities
    ) {}

    @AnonymousAllowed
    public void register(@Nonnull @Length(min=4, max=50) String username, @Nonnull @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&_\\-/\\\\])[A-Za-z\\d@$!%*#?&_\\-/\\\\]{8,}$", message = "Password must contain a minimum of eight characters, at least one letter, one number and one special character.") String password) {
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

    @PermitAll
    @Nonnull
    public List<String> getRoles() {
        Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();

        return = auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());
    }
}
