package com.hospital.service;

import com.hospital.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User findByEmail(String email);

    List<User> findAll();

    Optional<User> findById(Long id);

    User save(User user);

    void deleteById(Long id);

    User update(Long id, User user);
}