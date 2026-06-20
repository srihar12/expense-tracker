package com.expense.expense_tracker.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expense.expense_tracker.entity.User;
import com.expense.expense_tracker.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ✅ TEST ENDPOINT
    @GetMapping("/test")
    public String test() {
        return "Auth controller working!";
    }

    // -------- REGISTER --------
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    // -------- LOGIN --------
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return authService.login(user.getEmail(), user.getPassword());
    }
}