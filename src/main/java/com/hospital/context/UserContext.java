package com.hospital.context;

import com.hospital.enums.Role;

public class UserContext {
    private static final ThreadLocal<Long> currentUserId = new ThreadLocal<>();
    private static final ThreadLocal<Role> currentUserRole = new ThreadLocal<>();

    public static void setCurrentUser(Long userId, Role role) {
        currentUserId.set(userId);
        currentUserRole.set(role);
    }

    public static Long getCurrentUserId() {
        return currentUserId.get();
    }

    public static Role getCurrentUserRole() {
        return currentUserRole.get();
    }

    public static void clear() {
        currentUserId.remove();
        currentUserRole.remove();
    }
}