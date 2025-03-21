package com.hospital.controller;

import com.hospital.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @GetMapping("/ask")
    public String askQuestion(@RequestParam String question) {
        return chatbotService.getResponse(question);
    }
}
