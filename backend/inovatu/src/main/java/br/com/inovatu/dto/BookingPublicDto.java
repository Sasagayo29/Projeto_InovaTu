package br.com.inovatu.dto;

import java.time.LocalDateTime;

public record BookingPublicDto(
    Integer id,
    LocalDateTime startTime,
    LocalDateTime endTime
) {}
