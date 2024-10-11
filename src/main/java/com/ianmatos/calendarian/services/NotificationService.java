package com.ianmatos.calendarian.services;

import java.time.Duration;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.EndpointSubscription;
import com.vaadin.hilla.Nonnull;

import jakarta.annotation.security.PermitAll;
import reactor.core.publisher.Flux;

@PermitAll
public class NotificationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(NotificationService.class);

    /*
     * public Flux<@Nonnull String> getClock() {
     * return Flux.interval(Duration.ofSeconds(1))
     * .onBackpressureDrop()
     * .map(_interval -> new Date().toString());
     * }
     * 
     * public EndpointSubscription<@Nonnull String> getNotifications() {
     * return EndpointSubscription.of(getClock(), () -> {
     * LOGGER.info("Subscription has been cancelled");
     * });
     * }
     */
}
