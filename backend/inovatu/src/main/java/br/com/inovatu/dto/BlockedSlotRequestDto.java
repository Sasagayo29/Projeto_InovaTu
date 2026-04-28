package br.com.inovatu.dto;

import java.time.LocalDateTime;

public record BlockedSlotRequestDto(
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    String reason,
    Boolean isAllDay,
    Integer roomId 
) {}