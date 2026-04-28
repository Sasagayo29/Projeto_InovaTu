package br.com.inovatu.dto;

import java.util.List;

public record RoomAvailabilityDto(
    Integer roomId,
    String roomName,
    Integer capacity,
    List<TimeSlotDto> availableSlots
) {}