package com.RGM.FinalProject.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class AuthController {

    @GetMapping("/api/auth/check")
    public UserRoleResponse check(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthorized");
        }

        Set<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority) // es. "ROLE_ADMIN"
                .map(role -> role.replace("ROLE_", "")) // rimuovo prefisso
                .collect(Collectors.toSet());

        // Se vuoi puoi anche restituire solo il primo ruolo (esempio)
        String role = roles.isEmpty() ? "UNKNOWN" : roles.iterator().next();

        return new UserRoleResponse(role);
    }

    public static class UserRoleResponse {
        private String role;

        public UserRoleResponse(String role) {
            this.role = role;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
