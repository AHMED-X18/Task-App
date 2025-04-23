package com.hackaton.Task.app.Models;
import jakarta.persistence.*;
import lombok.Data;

import java.time.*;

@Data
@Entity
@Table (name="Tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String libelle;

    private String etiquette;

    private LocalDate date;

    private LocalTime heure;

    private String priorite;

    private String statut;

    private LocalDateTime rappel; // Utilisé pour l'alarme

    /* Getters et Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getEtiquette() {
        return etiquette;
    }

    public void setEtiquette(String etiquette) {
        this.etiquette = etiquette;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getHeure() {
        return heure;
    }

    public void setHeure(LocalTime heure) {
        this.heure = heure;
    }

    public String getPriorite() {
        return priorite;
    }

    public void setPriorite(String priorite) {
        this.priorite = priorite;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public LocalDateTime getRappel() {
        return rappel;
    }

    public void setRappel(LocalDateTime rappel) {
        this.rappel = rappel;
    }
    */
}
