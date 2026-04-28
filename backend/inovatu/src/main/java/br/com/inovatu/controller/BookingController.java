package br.com.inovatu.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.inovatu.dto.BookingAdminDto;
import br.com.inovatu.dto.BookingPublicDto;
import br.com.inovatu.dto.BookingRequestDto;
import br.com.inovatu.dto.RoomScheduleDto;
import br.com.inovatu.service.BookingService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingAdminDto> createBooking(@RequestBody @Valid BookingRequestDto dto) {
        BookingAdminDto newBooking = bookingService.createBooking(dto);
        return ResponseEntity.ok(newBooking);
    }

    @GetMapping("/availability")
    public ResponseEntity<List<RoomScheduleDto>> getAvailability(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end
    ) {
        return ResponseEntity.ok(bookingService.findAvailableRooms(start, end));
    }
}