package com.hospital.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ChatbotService {

    private Map<String, String> responses;

    public ChatbotService() {
        responses = new HashMap<>();
        responses.put("hello", "Hello! How can I assist you?");
        responses.put("hospital timings", "Our hospital is open from 8 AM to 8 PM.");
        responses.put("services", "We offer General Checkups, Surgery, Pediatrics, and more.");
        responses.put("doctor availability", "Please provide the doctor's name to check their availability.");
    }

    public String getResponse(String userInput) {
        return responses.getOrDefault(userInput.toLowerCase(), "I'm sorry, I don't understand. Can you rephrase?");
    }
}
