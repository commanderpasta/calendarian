package com.ianmatos.calendarian.services;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.ianmatos.calendarian.data.calendar.CalendarEntry;
import com.ianmatos.calendarian.data.calendar.CalendarEntryRepository;
import com.ianmatos.calendarian.data.user.User;
import com.ianmatos.calendarian.data.user.UserRepository;
import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.Nonnull;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.exception.EndpointException;

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
            @Nullable Long id,

            @Nonnull LocalDate date,

            @NotNull @NonNull CalendarEntry.Mood mood,

            @Nullable @PositiveOrZero int hoursOfSleep,

            @Nullable String note) {
    }

    private CalendarEntryRecord toCalendarEntryRecord(CalendarEntry c) {
        return new CalendarEntryRecord(
                c.getId(),
                c.getDate(),
                c.getMood(),
                c.getHoursOfSleep(),
                c.getNote());
    }

    @Nonnull
    public List<@Nonnull CalendarEntryRecord> findMyCalendar() {
        String username = VaadinRequest.getCurrent().getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);

        List<CalendarEntry> userCalendar = calendarRepository.findByUser(user);
        return userCalendar.stream()
                .map(this::toCalendarEntryRecord).toList();
    }

    @PermitAll
    public Optional<CalendarEntryRecord> findOneByDate(LocalDate date) {
        String username = VaadinRequest.getCurrent().getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);

        return calendarRepository.findByUserAndDate(user, date).map(this::toCalendarEntryRecord);
    }

    public void deleteById(Long calendarEntryId) throws EndpointException {
        String username = VaadinRequest.getCurrent().getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);
        CalendarEntry dbCalendarEntry;

        try {
            dbCalendarEntry = calendarRepository.findById(calendarEntryId).orElseThrow();
        } catch (Exception e) {
            throw new EndpointException("Entry not found.");
        }

        if (dbCalendarEntry.getUser() != user) {
            throw new EndpointException("Entry not found."); // prevent enumeration
        }

        calendarRepository.deleteById(calendarEntryId);
    }

    public CalendarEntryRecord save(CalendarEntryRecord calendarEntry) throws EndpointException {
        String username = VaadinRequest.getCurrent().getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);

        CalendarEntry updatedCalendarEntry;

        if (calendarEntry.id == null) {
            // create new element
            updatedCalendarEntry = new CalendarEntry();

            Optional<CalendarEntry> existingEntry = calendarRepository.findByUserAndDate(user, calendarEntry.date);
            if (existingEntry.isPresent()) {
                throw new EndpointException("An entry for the current day already exists.");
            }
        } else {
            // update existing
            updatedCalendarEntry = calendarRepository.findById(calendarEntry.id).orElseThrow();
        }

        updatedCalendarEntry.setDate(calendarEntry.date);
        updatedCalendarEntry.setMood(calendarEntry.mood);
        updatedCalendarEntry.setHoursOfSleep(calendarEntry.hoursOfSleep);
        updatedCalendarEntry.setNote(calendarEntry.note);
        updatedCalendarEntry.setUser(user);

        var saved = calendarRepository.save(updatedCalendarEntry);

        return toCalendarEntryRecord(saved);
    }
}
