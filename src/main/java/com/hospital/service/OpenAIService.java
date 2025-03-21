package com.hospital.service;

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

    public OpenAIService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String getChatbotResponse(String userMessage) {
        ChatRequest request = new ChatRequest(
                "gpt-3.5-turbo",
                Collections.singletonList(new ChatRequest.Message("user", userMessage))
        );

        Mono<ChatResponse> responseMono = webClient.post()
                .header("Authorization", "Bearer " + openAiApiKey) // Add API Key at runtime
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatResponse.class);

        return responseMono.map(response -> response.getChoices().get(0).getMessage().getContent())
                .block();
    }
}
