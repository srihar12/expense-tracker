package com.expense.expense_tracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expense.expense_tracker.entity.Expense;
import com.expense.expense_tracker.repository.ExpenseRepository;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseRepository repo;

    public ExpenseController(ExpenseRepository repo) {
        this.repo = repo;
    }

    /* -------- ADD -------- */

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return repo.save(expense);
    }

    /* -------- GET -------- */

    @GetMapping("/{email}")
    public List<Expense> getExpensesByEmail(@PathVariable String email) {
        return repo.findByEmail(email);
    }

    /* -------- DELETE -------- */

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        if (id != null) {   // ✅ Fix null warning
            repo.deleteById(id);
        }
    }
}