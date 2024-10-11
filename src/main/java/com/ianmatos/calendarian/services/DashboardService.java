package com.ianmatos.calendarian.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.lang.NonNullApi;

import com.ianmatos.calendarian.data.calendar.CalendarEntry;
import com.ianmatos.calendarian.data.calendar.CalendarEntryRepository;
import com.ianmatos.calendarian.data.user.User;
import com.ianmatos.calendarian.data.user.UserRepository;
import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.Nonnull;

import jakarta.annotation.security.PermitAll;
import jakarta.validation.constraints.NotNull;

@Endpoint
@PermitAll
public class DashboardService {
    private final CalendarEntryRepository calendarRepository;
    private final UserRepository userRepository;

    public DashboardService(CalendarEntryRepository calendarRepository, UserRepository userRepository) {
        this.calendarRepository = calendarRepository;
        this.userRepository = userRepository;
    }

    public record TrendRecord(
        @Nonnull
        LocalDate date,

        @NotNull
        CalendarEntry.Mood mood,
        
        @Nonnull
        int sleep
    ) {
    }

    private TrendRecord toTrendRecord(CalendarEntry entry) {
        return new TrendRecord(entry.getDate(), entry.getMood(), entry.getHoursOfSleep());
    }

    
    public @Nonnull List<@Nonnull TrendRecord> getMyTrend() {
        String username = VaadinRequest.getCurrent().getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);

        List<CalendarEntry> recentEntries = calendarRepository.findByUserAndDateBetweenOrderByDate(user, LocalDate.now().minusDays(30), LocalDate.now());

        return recentEntries.stream()
            .map(this::toTrendRecord)
            .toList();
    }
}
