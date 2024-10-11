package com.ianmatos.calendarian.data.calendar;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ianmatos.calendarian.data.user.User;

public interface CalendarEntryRepository extends JpaRepository<CalendarEntry, Long> {
    List<CalendarEntry> findByUser(User user);
    
    Optional<CalendarEntry> findByUserAndDate(User user, LocalDate date);
}
