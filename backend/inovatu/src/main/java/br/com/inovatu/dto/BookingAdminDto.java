package br.com.inovatu.dto;

import java.time.LocalDateTime;

import br.com.inovatu.model.enuns.BookingStatus;

public record BookingAdminDto(
    Integer id,
    Integer roomId,
    String roomName,
    LocalDateTime startTime,
    LocalDateTime endTime,
    String userName,
    String userEmail,
    String userInstitution,
    String purpose,
    BookingStatus status
) {}