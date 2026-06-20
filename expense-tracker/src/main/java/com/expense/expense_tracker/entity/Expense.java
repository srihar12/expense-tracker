package com.expense.expense_tracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private double amount;

    private String description;

    @Column(nullable = false)
    private String date;

    // ✅ Default constructor (required)
    public Expense() {}

    // ✅ Optional: Full constructor
    public Expense(Long id, String email, String category, double amount, String description, String date) {
        this.id = id;
        this.email = email;
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }

    // ✅ GETTERS & SETTERS

    public Long getId() {
        return id;
    }

    // 🔥 IMPORTANT (missing before)
    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}