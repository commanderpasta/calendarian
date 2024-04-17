package com.example.application.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CalendarRepository extends JpaRepository<CalendarEntry, Long> {
    @Query("SELECT c FROM CalendarEntry c WHERE c.user = ?1")
    List<CalendarEntry> findAllOfUser(Long userId);
}
