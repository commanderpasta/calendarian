package com.example.application.data;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDateTime;

@Entity
public class CalendarEntry extends AbstractEntity {
    public enum Mood {
        VERYPOSITIVE,
        POSITIVE,
        NEUTRAL,
        NEGATIVE,
        VERYNEGATIVE
    }
    
    @NotNull
    private LocalDateTime date;

    @NotNull
    private Mood mood;

    @Nullable
    @PositiveOrZero
    private int hoursOfSleep;

    @ManyToOne()
    private CalendarUser user;

    @Nullable
    private String note;

    public CalendarEntry(LocalDateTime date, Mood mood, int hoursOfSleep, String note, CalendarUser user) {
        this.date = date;
        this.mood = mood;
        this.hoursOfSleep = hoursOfSleep;
        this.note = note;
        this.user = user;
    }

    public CalendarEntry() {
    }

    public Mood getMood() {
        return mood;
    }

    public void setMood(Mood mood) {
        this.mood = mood;
    }

    public int getHoursOfSleep() {
        return hoursOfSleep;
    }

    public void setHoursOfSleep(int hoursOfSleep) {
        this.hoursOfSleep = hoursOfSleep;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public CalendarUser getUser() {
        return user;
    }

    public void setUser(CalendarUser user) {
        this.user = user;
    }
}
