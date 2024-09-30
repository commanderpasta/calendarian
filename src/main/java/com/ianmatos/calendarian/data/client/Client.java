package com.ianmatos.calendarian.data.client;

import com.ianmatos.calendarian.data.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="client")
public class Client extends AbstractEntity {
    @NotNull
    @Column(unique=true)
    private String username;

    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user.id")
    private User connectedUser;
    */

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
