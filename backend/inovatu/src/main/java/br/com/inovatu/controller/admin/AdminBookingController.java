package br.com.inovatu.controller.admin;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.inovatu.dto.BookingAdminDto;
import br.com.inovatu.service.BookingService;

@RestController
@RequestMapping("/api/admin/bookings")
public class AdminBookingController {

    @Autowired
    private BookingService bookingService; 

    @GetMapping
    public ResponseEntity<List<BookingAdminDto>> getAllBookings(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer roomId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(bookingService.findBookingsWithFilters(status, roomId, date));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingAdminDto> getBookingById(@PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<BookingAdminDto> approveBooking(@PathVariable Integer id) {
        BookingAdminDto updatedBooking = bookingService.approveBooking(id);
        return ResponseEntity.ok(updatedBooking);
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<BookingAdminDto> rejectBooking(
            @PathVariable Integer id,
            @RequestBody @jakarta.validation.Valid br.com.inovatu.dto.BookingRejectDto dto
    ) {
        BookingAdminDto updatedBooking = bookingService.rejectBooking(id, dto.reason());
        return ResponseEntity.ok(updatedBooking);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Integer id) {
        bookingService.deleteBooking(id); 
        return ResponseEntity.noContent().build();
    }
}