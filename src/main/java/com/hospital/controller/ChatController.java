package com.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hospital.dto.ChatRequest;
import com.hospital.entity.ChatMessage;
import com.hospital.service.ChatService;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private static final Logger LOGGER = Logger.getLogger(ChatController.class.getName());

    @Autowired
    private ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ChatRequest requestDTO) {
        try {
            ChatMessage chatMessage = chatService.sendMessage(
                requestDTO.getSenderId(),
                requestDTO.getSenderId(),
                requestDTO.getMessages()
            );
            return ResponseEntity.ok(chatMessage);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error sending message", e);
            return ResponseEntity.internalServerError().body("Error sending message: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getChatHistory(@RequestParam Long userId1, @RequestParam Long userId2) {
        List<ChatMessage> chatHistory = chatService.getChatHistory(userId1, userId2);
        return ResponseEntity.ok(chatHistory);
    }
}
