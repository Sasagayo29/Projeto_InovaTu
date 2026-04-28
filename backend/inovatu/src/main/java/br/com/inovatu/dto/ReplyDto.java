package br.com.inovatu.dto;

import jakarta.validation.constraints.NotBlank;

public record ReplyDto(
    @NotBlank String subject,
    @NotBlank String message
) {}