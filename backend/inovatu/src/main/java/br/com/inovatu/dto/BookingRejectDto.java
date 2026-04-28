package br.com.inovatu.dto;

import jakarta.validation.constraints.NotBlank;

public record BookingRejectDto(
    @NotBlank(message = "O motivo da rejeição é obrigatório.")
    String reason
) {}