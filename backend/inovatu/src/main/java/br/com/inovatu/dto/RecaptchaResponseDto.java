package br.com.inovatu.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RecaptchaResponseDto(
    boolean success,
    double score,
    String action,
    @JsonProperty("error-codes") List<String> errorCodes
) {}
