package com.hospital.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
}