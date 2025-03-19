package com.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hospital.entity.ChatMessage;
import com.hospital.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestParam Long senderId,
                                   @RequestParam Long receiverId,
                                   @RequestParam String message) {
        try {
            return chatService.sendMessage(senderId, receiverId, message);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error properly
            throw new RuntimeException("Error sending message");
        }
    }

    @GetMapping("/history")
    public List<ChatMessage> getChatHistory(@RequestParam Long userId1, @RequestParam Long userId2) {
        return chatService.getChatHistory(userId1, userId2);
    }
}
