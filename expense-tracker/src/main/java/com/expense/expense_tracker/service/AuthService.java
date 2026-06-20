package com.expense.expense_tracker.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.expense.expense_tracker.entity.User;
import com.expense.expense_tracker.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public AuthService(UserRepository userRepository,
                       BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    /* -------- REGISTER -------- */

    public User register(User user) {

        // ✅ Validate input
        if (user.getName() == null || user.getEmail() == null || user.getPassword() == null ||
            user.getName().isBlank() || user.getEmail().isBlank() || user.getPassword().isBlank()) {
            throw new RuntimeException("Name, email and password are required");
        }

        String email = user.getEmail().trim().toLowerCase();

        // ✅ Check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // ✅ Normalize data
        user.setEmail(email);

        // ✅ Encrypt password
        user.setPassword(encoder.encode(user.getPassword()));

        // ✅ Save user
        return userRepository.save(user);
    }

    /* -------- LOGIN -------- */

    public User login(String email, String password) {

        // ✅ Validate input
        if (email == null || password == null || email.isBlank() || password.isBlank()) {
            throw new RuntimeException("Email and password are required");
        }

        String cleanEmail = email.trim().toLowerCase();

        // ✅ Find user
        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Check password
        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}