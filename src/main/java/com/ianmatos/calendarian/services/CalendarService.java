package com.ianmatos.calendarian.services;

import java.time.LocalDate;
import java.util.List;

import com.ianmatos.calendarian.data.calendar.CalendarEntry;
import com.ianmatos.calendarian.data.calendar.CalendarEntryRepository;
import com.ianmatos.calendarian.data.user.User;
import com.ianmatos.calendarian.data.user.UserRepository;
import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.Nonnull;
import com.vaadin.hilla.Nullable;

import jakarta.annotation.security.PermitAll;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Endpoint
@PermitAll
public class CalendarService {
    private final CalendarEntryRepository calendarRepository;
    private final UserRepository userRepository;

    public CalendarService(CalendarEntryRepository calendarRepository, UserRepository userRepository) {
        this.calendarRepository = calendarRepository;
        this.userRepository = userRepository;
    }

    public record CalendarEntryRecord(
            @Nullable
            Long id,

            @Nonnull
            LocalDate date,

            @NotNull
            CalendarEntry.Mood mood,

            @Nullable
            @PositiveOrZero
            int hoursOfSleep,

            @Nullable
            String note
    ) {
    }

    private CalendarEntryRecord toCalendarEntryRecord(CalendarEntry c) {
        return new CalendarEntryRecord(
                c.getId(),
                c.getDate(),
                c.getMood(),
                c.getHoursOfSleep(),
                c.getNote()
        );
    }

    public List<CalendarEntryRecord> findMyCalendar() {
        String username = VaadinRequest.getCurrent().getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);

        List<CalendarEntry> userCalendar = calendarRepository.findByUser(user);
        return userCalendar.stream()
                .map(this::toCalendarEntryRecord).toList();
    }

    public CalendarEntryRecord save(CalendarEntryRecord calendarEntry) {
        String username = VaadinRequest.getCurrent().getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);

        CalendarEntry dbCalendarEntry;

        if (calendarEntry.id == null) {
            dbCalendarEntry = new CalendarEntry();
        } else {
            dbCalendarEntry = calendarRepository.findById(calendarEntry.id).orElseThrow();
        }

        dbCalendarEntry.setDate(calendarEntry.date);
        dbCalendarEntry.setMood(calendarEntry.mood);
        dbCalendarEntry.setHoursOfSleep(calendarEntry.hoursOfSleep);
        dbCalendarEntry.setNote(calendarEntry.note);
        dbCalendarEntry.setUser(user);

        var saved = calendarRepository.save(dbCalendarEntry);

        return toCalendarEntryRecord(saved);
    }
}
