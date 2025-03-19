package com.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.entity.ChatMessage;
import com.hospital.repository.ChatMessageRepository;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatMessage sendMessage(Long senderId, Long receiverId, String message) {
        ChatMessage chatMessage = new ChatMessage(senderId, receiverId, message);
        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getChatHistory(Long userId1, Long userId2) {
        return chatMessageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
                userId1, userId2, userId2, userId1);
    }
}
