package com.ianmatos.calendarian.data.calendar;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ianmatos.calendarian.data.client.Client;


public interface CalendarEntryRepository extends JpaRepository<CalendarEntry, Long> {
    List<CalendarEntry> findByClient(Client client);
}
