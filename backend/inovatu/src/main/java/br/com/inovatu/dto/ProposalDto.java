package br.com.inovatu.dto;

import java.time.Instant;

import br.com.inovatu.model.enuns.ProposalStatus;
import br.com.inovatu.model.enuns.ProposerType;

public record ProposalDto(
    Integer id,
    String name,
    String email,
    String whatsapp,
    ProposerType proposerType,
    String description,
    ProposalStatus status,
    Instant createdAt
) {}
