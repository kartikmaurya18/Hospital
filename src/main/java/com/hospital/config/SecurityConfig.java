package com.hospital.config;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hospital.entity.Doctor;

public class SecurityConfig implements UserDetails{
@Autowired
    Doctor doctor;

    public SecurityConfig(Doctor doctor){
        this.doctor=doctor;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_"+doctor.getRole().name()));
    }

    @Override
    public String getPassword() {
        return doctor.getPassword();
    }

    @Override
    public String getUsername() {
        return doctor.getEmail();
    }
    
}
