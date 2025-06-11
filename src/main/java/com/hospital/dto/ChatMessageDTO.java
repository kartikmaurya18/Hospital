package com.hospital.dto;

import java.time.LocalDateTime;

public class ChatMessageDTO {
    private Long senderId;
    private Long receiverId;
    private String content;
    private String senderName;
    private String senderRole;
    private LocalDateTime timestamp;

    public ChatMessageDTO() {
    }

    public ChatMessageDTO(Long senderId, Long receiverId, String content, String senderName, String senderRole) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.senderName = senderName;
        this.senderRole = senderRole;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderRole() {
        return senderRole;
    }

    public void setSenderRole(String senderRole) {
        this.senderRole = senderRole;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}