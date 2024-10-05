package com.ianmatos.calendarian.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder.BCryptVersion;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

import com.vaadin.flow.spring.security.VaadinWebSecurity;
import com.vaadin.hilla.route.RouteUtil;

/*
 * Reference: https://vaadin.com/docs/latest/hilla/guides/security/spring-login
 */

@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {

  private final RouteUtil routeUtil;
  @Autowired
  private DataSource dataSource;

  public SecurityConfig(RouteUtil routeUtil) {
    this.routeUtil = routeUtil;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // Set default security policy that permits Hilla internal requests and
    // denies all other
    http.userDetailsService(userDetailsService(passwordEncoder())).authorizeHttpRequests(registry -> registry.requestMatchers(
            routeUtil::isRouteAllowed).permitAll());
    super.configure(http);
    // use a custom login view and redirect to root on logout
    setLoginView(http, "/login", "/");
  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    super.configure(web);
  }

  @Bean
  PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder(BCryptVersion.$2Y, 12);
  }

  @Bean
  public UserDetailsManager userDetailsService(PasswordEncoder passwordEncoder) {
    JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);

    if (!userDetailsManager.userExists("user")) {
      UserDetails user = User.builder()
        .username("user")
        .password(passwordEncoder().encode("password"))
        .roles("USER")
        .build();
      userDetailsManager.createUser(user);
    }
    return userDetailsManager;

  }
}
