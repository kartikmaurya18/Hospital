package com.hospital.controller;

import com.hospital.dto.ChatRequest;
import com.hospital.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/ask")
    public String askChatbot(@RequestBody ChatRequest request) {
        if (request.getMessages() == null || request.getMessages().isEmpty()) {
            return "Message cannot be empty.";
        }

        // Send user message to OpenAI and get response
        return openAIService.getChatbotResponse(request.getMessages().get(0).getContent());
    }
}
