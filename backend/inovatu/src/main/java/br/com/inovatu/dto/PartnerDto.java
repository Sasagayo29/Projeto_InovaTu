package br.com.inovatu.dto;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotBlank;

public record PartnerDto(
    Integer id,
    @NotBlank String name,
    String description,
    @URL String logoUrl,
    @URL String websiteUrl,
    boolean isActive
) {}
