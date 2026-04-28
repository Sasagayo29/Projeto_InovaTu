package br.com.inovatu.dto;

import br.com.inovatu.model.enuns.EventStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;
public record EventRequestDto(
        @NotBlank(message = "É necessário atribuir um nome ao evento.")
        String name,

        @NotBlank(message = "É necessário atribuir uma descrição ao evento.")
        String description,

        @NotBlank(message = "É necessário atribuir um local ao evento.")
        String local,

        @NotNull(message = "É necessário atribuir data e hora ao evento.")
        Instant dateTime,

        String targetAudience,
        String registrationLink,

        @NotNull(message = "É necessário atribuir um status ao evento.")
        EventStatus status,

        List<String> imageUrls
) {
}
