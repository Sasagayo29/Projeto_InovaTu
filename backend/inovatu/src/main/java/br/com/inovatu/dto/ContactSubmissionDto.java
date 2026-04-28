package br.com.inovatu.dto;

import java.time.Instant;

import br.com.inovatu.model.enuns.SubmissionStatus;

public record ContactSubmissionDto(
    Integer id,
    String name,
    String email,
    String subject,
    String message,
    SubmissionStatus status,
    Instant createdAt
) {}
