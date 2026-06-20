package com.expense.expense_tracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // ✅ Password encoder bean
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ✅ Security configuration
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // ❌ Disable CSRF (needed for frontend requests)
            .csrf(csrf -> csrf.disable())

            // ✅ Allow APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()      // register & login
                .requestMatchers("/expenses/**").permitAll()  // expense APIs (for now)
                .anyRequest().permitAll()                     // allow all (dev mode)
            )

            // ❌ Disable default Spring Security login page
            .formLogin(form -> form.disable())

            // ❌ Disable HTTP Basic auth popup
            .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }
}