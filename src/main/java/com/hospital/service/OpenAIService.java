package com.hospital.service;

import com.hospital.dto.ChatRequest;
import com.hospital.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;

@Service
public class OpenAIService {

    private final WebClient webClient;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    public OpenAIService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + openAiApiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String getChatbotResponse(String userMessage) {
        ChatRequest request = new ChatRequest(
                "gpt-3.5-turbo",
                Collections.singletonList(new ChatRequest.Message("user", userMessage))
        );

        Mono<ChatResponse> responseMono = webClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatResponse.class);

        return responseMono.map(response -> response.getChoices().get(0).getMessage().getContent())
                .block();
    }
}
