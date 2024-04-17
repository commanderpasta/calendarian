package com.example.application.services;

import java.time.LocalDateTime;
import java.util.List;

import com.example.application.data.CalendarRepository;
import com.example.application.data.CalendarEntry;
import com.example.application.data.UserRepository;
import com.github.javaparser.quality.NotNull;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.PositiveOrZero;

@AnonymousAllowed
@BrowserCallable
public class CalendarService {
    private final CalendarRepository calendarRepository;
    private final UserRepository userRepository;

    public CalendarService(CalendarRepository calendarRepository, UserRepository userRepository) {
        this.calendarRepository = calendarRepository;
        this.userRepository = userRepository;
    }

    public record CalendarEntryRecord(
            Long id,

            @NotNull
            LocalDateTime date,

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
        List<CalendarEntry> userCalendar = calendarRepository.findAllOfUser(userId);
        return userCalendar.stream() 
                .map(this::toCalendarEntryRecord).toList();
    }

    public CalendarEntryRecord save(CalendarEntryRecord calendarEntry) {
        var dbCalendarEntry = calendarRepository.findById(calendarEntry.id).orElseThrow();
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
