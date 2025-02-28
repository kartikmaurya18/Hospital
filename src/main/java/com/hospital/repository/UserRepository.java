package com.hospital.repository;

import com.hospital.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);   // Correct ✅
    Optional<User> findByName(String name);     // Fixed method name ✅
    Optional<User> findByUsername(String user);  // Fixed return type ✅
}
