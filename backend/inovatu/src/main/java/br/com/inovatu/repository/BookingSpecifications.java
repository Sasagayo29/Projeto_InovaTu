package br.com.inovatu.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime; 

import org.springframework.data.jpa.domain.Specification;

import br.com.inovatu.model.Booking;
import br.com.inovatu.model.enuns.BookingStatus; 

public class BookingSpecifications {

    public static Specification<Booking> hasStatus(String status) {
        return (root, query, cb) -> {
            if (status == null || status.trim().isEmpty()) {
                return cb.conjunction();
            }
            try {
                BookingStatus statusEnum = BookingStatus.valueOf(status.toUpperCase());
                return cb.equal(root.get("status"), statusEnum);
            } catch (IllegalArgumentException e) {
                return cb.disjunction(); 
            }
        };
    }

    public static Specification<Booking> hasRoomId(Integer roomId) {
        return (root, query, cb) -> {
            if (roomId == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("room").get("id"), roomId);
        };
    }

    public static Specification<Booking> hasDate(LocalDate date) {
        return (root, query, cb) -> {
            if (date == null) {
                return cb.conjunction();
            }
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
            
            return cb.between(root.get("startTime"), startOfDay, endOfDay);
        };
    }
}