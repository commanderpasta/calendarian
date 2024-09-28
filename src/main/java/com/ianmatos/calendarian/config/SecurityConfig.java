package com.ianmatos.calendarian.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
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

  public SecurityConfig(RouteUtil routeUtil) {
    this.routeUtil = routeUtil;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // Set default security policy that permits Hilla internal requests and
    // denies all other
    http.authorizeHttpRequests(registry -> registry.requestMatchers(
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
  public DataSource dataSource() {
      return new EmbeddedDatabaseBuilder()
          .setType(EmbeddedDatabaseType.H2)
          .addScript(JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION)
          .build();
  }

  @Bean
  public UserDetailsManager users(DataSource dataSource) {
    JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);

    UserDetails user = User.withDefaultPasswordEncoder()
        .username("user")
        .password("password")
        .roles("USER")
        .build();
    userDetailsManager.createUser(user);
    return userDetailsManager;
  }
}
