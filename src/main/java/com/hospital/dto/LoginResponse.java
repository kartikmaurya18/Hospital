package com.hospital.dto;

import com.hospital.entity.UserRole;
import lombok.Data;
import java.util.Map;

@Data
public class LoginResponse {
    private String token;
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
    private long expiresIn;
    private Map<String, Object> additionalData;
}