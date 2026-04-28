package br.com.inovatu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record RoomDto(
    Integer id,

    @NotBlank(message = "O nome da sala é obrigatório.")
    String name,

    String description,

    @PositiveOrZero(message = "A capacidade deve ser um número positivo ou zero.")
    Integer capacity
) {}
