package com.ianmatos.calendarian.data.calendar;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;

import com.ianmatos.calendarian.data.AbstractEntity;
import com.ianmatos.calendarian.data.user.User;
import com.vaadin.hilla.Nullable;

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
    @PastOrPresent
    private LocalDate date;

    @NotNull
    private Mood mood;

    @Nullable
    @PositiveOrZero
    private int hoursOfSleep;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username")
    private User user;

    @Nullable
    private String note;

    public CalendarEntry(LocalDate date, Mood mood, int hoursOfSleep, String note, User user) {
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
