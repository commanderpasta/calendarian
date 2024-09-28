package com.ianmatos.calendarian.data.calendar;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;

import com.ianmatos.calendarian.data.AbstractEntity;
import com.ianmatos.calendarian.data.client.Client;

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
    private LocalDate date;

    @NotNull
    private Mood mood;

    @Nullable
    @PositiveOrZero
    private int hoursOfSleep;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client.id")
    private Client client;

    @Nullable
    private String note;

    public CalendarEntry(LocalDate date, Mood mood, int hoursOfSleep, String note, Client client) {
        this.date = date;
        this.mood = mood;
        this.hoursOfSleep = hoursOfSleep;
        this.note = note;
        this.client = client;
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

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
