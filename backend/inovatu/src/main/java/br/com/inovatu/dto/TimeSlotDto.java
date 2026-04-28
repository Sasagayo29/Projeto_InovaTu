package br.com.inovatu.dto;

import java.time.LocalDateTime;

public record TimeSlotDto(
    LocalDateTime start,
    LocalDateTime end
) {}