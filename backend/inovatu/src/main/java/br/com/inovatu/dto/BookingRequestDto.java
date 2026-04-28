package br.com.inovatu.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BookingRequestDto(
    @NotNull Integer roomId,
    @NotNull @Future LocalDateTime startTime,
    @NotNull @Future LocalDateTime endTime,
    @NotBlank String userName,
    @NotBlank @Email String userEmail,
    String userInstitution,
    String purpose
) {}
