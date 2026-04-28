package br.com.inovatu.dto;

import java.util.List;

public record RoomScheduleDto(
    Integer roomId,
    String roomName,
    Integer capacity,
    List<DayScheduleDto> availability 
) {}