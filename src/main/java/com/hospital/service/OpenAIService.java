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

    @Value("${openai.api.key}") // Load API key from application.properties
    private String openAiApiKey;

    private final WebClient webClient;

    public OpenAIService(WebClient.Builder webClientBuilder, @Value("${openai.api.key}") String apiKey) {
        this.webClient = webClientBuilder
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Authorization", "Bearer " + apiKey) // Set API Key
                .build();
    }

    public String getChatbotResponse(String userMessage) {
        ChatRequest request = new ChatRequest(
                "gpt-3.5-turbo",
                Collections.singletonList(new ChatRequest.Message("user", userMessage)), null, null
        );

        Mono<ChatResponse> responseMono = webClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatResponse.class);

        return responseMono.map(response -> 
                response.getChoices().get(0).getMessage().getContent()
        ).block();
    }
}
