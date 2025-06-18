package com.hospital.service;

import com.hospital.entity.User;
import com.hospital.entity.UserRole;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);

    User updateUser(User user);

    void deleteUser(Long id);

    Optional<User> getUserById(Long id);

    Optional<User> getUserByEmail(String email);

    List<User> getAllUsers();

    List<User> getUsersByRole(UserRole role);

    List<User> getActiveUsers();

    boolean deactivateUser(Long id);

    boolean activateUser(Long id);
}