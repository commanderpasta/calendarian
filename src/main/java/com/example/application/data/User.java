package com.example.application.data;

import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import jakarta.annotation.Nullable;

@Entity
public class User extends AbstractEntity {
    @OneToMany(mappedBy = "user")
    @Nullable
    private List<CalendarEntry> calendarEntries = new LinkedList<>();
}