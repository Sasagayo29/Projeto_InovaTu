package br.com.inovatu.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import br.com.inovatu.model.Booking;
import br.com.inovatu.model.enuns.BookingStatus;

public interface BookingRepository extends JpaRepository<Booking, Integer>, JpaSpecificationExecutor<Booking> {


    List<Booking> findAllByRoomIdAndStatus(Integer roomId, BookingStatus status);

    List<Booking> findAllByStatus(BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId " +
           "AND b.status = 'APROVADO' " +
           "AND (b.startTime < :newEnd AND b.endTime > :newStart)")
    List<Booking> findConflictingApprovedBookings(
        Integer roomId, 
        LocalDateTime newStart, 
        LocalDateTime newEnd
    );

    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId " +
           "AND b.status = 'PENDENTE' " +
           "AND (b.startTime < :newEnd AND b.endTime > :newStart)")
    List<Booking> findConflictingPendingBookings(
        Integer roomId, 
        LocalDateTime newStart, 
        LocalDateTime newEnd
    );

    List<Booking> findByRoomIdAndStatus(Integer roomId, BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.status = 'APROVADO' " +
           "AND b.startTime < :rangeEnd " +
           "AND b.endTime > :rangeStart")
    List<Booking> findAllApprovedOverlapping(LocalDateTime rangeStart, LocalDateTime rangeEnd);
}
