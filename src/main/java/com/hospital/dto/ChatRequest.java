package com.hospital.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class ChatRequest {

    @JsonProperty("model")
    private String model;

    @JsonProperty("messages")
    private List<Message> messages;

    @JsonProperty("sender_id")
    private Long senderId;

    @JsonProperty("receiver_id")
    private Long receiverId;

    // ✅ Constructor
    public ChatRequest(String model, List<Message> messages, Long senderId, Long receiverId) {
        this.model = model;
        this.messages = messages;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }

    // ✅ Default Constructor (For Serialization)
    public ChatRequest() {
    }

    // ✅ Getters and Setters
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

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

    // ✅ Nested Message Class
    public static class Message {
        @JsonProperty("role")
        private String role;

        @JsonProperty("content")
        private String content;

        // ✅ Constructor
        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }

        // ✅ Default Constructor
        public Message() {
        }

        // ✅ Getters and Setters
        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}
