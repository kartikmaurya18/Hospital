package com.hospital;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootTest
@ImportAutoConfiguration(exclude = SecurityAutoConfiguration.class) // ✅ Removed extra `{`
public class ApplicationTests { // ✅ Class name should be ApplicationTests

    @Test
    void contextLoads() {
        // This test simply checks if the Spring context loads properly
    }
}
