package br.com.inovatu.dto;

import br.com.inovatu.model.enuns.ProposerType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProposalRequestDto(
    @NotBlank(message = "O nome é obrigatório.")
    String name,

    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "Formato de e-mail inválido.")
    String email,

    @NotBlank(message = "O WhatsApp é obrigatório.")
    String whatsapp,

    @NotBlank(message = "A descrição da proposta é obrigatória.")
    String description,

    @NotNull(message = "O tipo de proponente é obrigatório (STARTUP, EMPRESA, INVESTIDOR, CONTRIBUINTE).")
    ProposerType proposerType,

    @NotBlank(message = "Token do reCAPTCHA é obrigatório.")
    String recaptchaToken
) {}