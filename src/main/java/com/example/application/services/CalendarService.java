package com.example.application.services;

import java.time.LocalDate;
import java.util.List;

import com.example.application.data.CalendarRepository;
import com.example.application.data.CalendarUser;
import com.example.application.data.CalendarUserRepository;
import com.example.application.data.CalendarEntry;
import com.github.javaparser.quality.NotNull;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.PositiveOrZero;

@AnonymousAllowed
@BrowserCallable
public class CalendarService {
    private final CalendarRepository calendarRepository;
    private final CalendarUserRepository userRepository;

    public CalendarService(CalendarRepository calendarRepository, CalendarUserRepository userRepository) {
        this.calendarRepository = calendarRepository;
        this.userRepository = userRepository;
    }

    public record CalendarEntryRecord(
            @Nullable
            Long id,

            @NotNull
            LocalDate date,

            @NotNull
            CalendarEntry.Mood mood,

            @Nullable
            @PositiveOrZero
            int hoursOfSleep,

            @NotNull
            long userId,

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
                c.getUser().getId(),
                c.getNote()
        );
    }

    public List<CalendarEntryRecord> findCalendarOfUser(long userId) {
        CalendarUser user = userRepository.findById(userId).orElseThrow();

        List<CalendarEntry> userCalendar = calendarRepository.findAllOfUser(user);
        return userCalendar.stream()
                .map(this::toCalendarEntryRecord).toList();
    }

    public CalendarEntryRecord save(CalendarEntryRecord calendarEntry) {
        CalendarEntry dbCalendarEntry;

        if (calendarEntry.id == null) {
            dbCalendarEntry = new CalendarEntry();
        } else {
            dbCalendarEntry = calendarRepository.findById(calendarEntry.id).orElseThrow();
        }

        var dbUser = userRepository.findById(calendarEntry.userId).orElseThrow();

        dbCalendarEntry.setDate(calendarEntry.date);
        dbCalendarEntry.setMood(calendarEntry.mood);
        dbCalendarEntry.setHoursOfSleep(calendarEntry.hoursOfSleep);
        dbCalendarEntry.setNote(calendarEntry.note);
        dbCalendarEntry.setUser(dbUser);

        var saved = calendarRepository.save(dbCalendarEntry);

        return toCalendarEntryRecord(saved);
    }
}
