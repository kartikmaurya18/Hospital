package com.hospital.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hospital.config.DoctorConfig;
import com.hospital.entity.Doctor;
import com.hospital.repository.DoctorRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {
    
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Doctor doctor=doctorRepository.findByemail(email);
        if(doctor!=null){
            return new DoctorConfig(doctor);
        }
        throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
    }
    
}
