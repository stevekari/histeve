package com.codewithsteve.hellosteve.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.*;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "sms")
    @JsonAlias("sms")
    private String text;
    private long num;

    public long getNum() {
        return num;
    }

    public void setNum(long num) {
        this.num = num;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
