package com.hospital.controller;

import com.hospital.dto.ChatMessageDTO;
import com.hospital.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class WebSocketController {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketController.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessageDTO chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        try {
            logger.info("Received message from user {} to user {}", chatMessage.getSenderId(),
                    chatMessage.getReceiverId());

            // Save message to database
            chatService.saveMessage(chatMessage);

            // Send to specific user
            String destination = "/topic/user." + chatMessage.getReceiverId();
            messagingTemplate.convertAndSend(destination, chatMessage);

            // Send to sender (for confirmation)
            String senderDestination = "/topic/user." + chatMessage.getSenderId();
            messagingTemplate.convertAndSend(senderDestination, chatMessage);

            logger.info("Message successfully delivered to both users");
        } catch (Exception e) {
            logger.error("Error processing message: {}", e.getMessage(), e);
            String errorDestination = "/topic/user." + chatMessage.getSenderId() + "/errors";
            messagingTemplate.convertAndSend(errorDestination,
                    Map.of("error", "Failed to send message. Please try again."));
        }
    }

    @MessageExceptionHandler
    public void handleException(Throwable exception) {
        logger.error("WebSocket error: {}", exception.getMessage(), exception);
    }
}