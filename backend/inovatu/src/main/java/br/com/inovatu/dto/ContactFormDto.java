package br.com.inovatu.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ContactFormDto(
    @NotBlank String name,
    @NotBlank @Email String email,
    @NotBlank String subject,
    @NotBlank String message,
    @NotBlank String recaptchaToken
) {}
