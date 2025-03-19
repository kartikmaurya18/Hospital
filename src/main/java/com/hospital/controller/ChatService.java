package com.hospital.controller;

import com.hospital.entity.ChatMessage;
import com.hospital.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    // Save a chat message
    public ChatMessage sendMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    // Get chat history between two users
    public List<ChatMessage> getChatHistory(Long senderId, Long receiverId) {
        return chatMessageRepository.findBySenderIdAndReceiverIdOrderByTimestampAsc(senderId, receiverId);
    }
}
