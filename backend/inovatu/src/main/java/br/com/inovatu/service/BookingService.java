package br.com.inovatu.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import br.com.inovatu.dto.BookingAdminDto;
import br.com.inovatu.dto.BookingPublicDto;
import br.com.inovatu.dto.BookingRequestDto;
import br.com.inovatu.dto.RoomAvailabilityDto;
import br.com.inovatu.dto.RoomScheduleDto;

public interface BookingService {

    BookingAdminDto createBooking(BookingRequestDto dto);
    List<BookingPublicDto> getPublicBookingsByRoom(Integer roomId);
    List<BookingAdminDto> findBookingsWithFilters(String status, Integer roomId, LocalDate date);
    BookingAdminDto getBookingById(Integer id);
    BookingAdminDto approveBooking(Integer id);
    void deleteBooking(Integer id);
    List<RoomScheduleDto> findAvailableRooms(LocalDateTime start, LocalDateTime end);
    BookingAdminDto rejectBooking(Integer id, String reason);

}