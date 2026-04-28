package br.com.inovatu.service;

import br.com.inovatu.dto.*;
import br.com.inovatu.exception.ResourceNotFoundException;
import br.com.inovatu.model.BlockedSlot;
import br.com.inovatu.model.Booking;
import br.com.inovatu.model.OperatingHour;
import br.com.inovatu.model.Room;
import br.com.inovatu.model.enuns.BookingStatus;
import br.com.inovatu.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private OperatingHourRepository operatingHourRepository;

    @Autowired
    private BlockedSlotRepository blockedSlotRepository;

    @Autowired
    private EmailService emailService;


    @Override
    @Transactional
    public BookingAdminDto createBooking(BookingRequestDto dto) {
       
        Booking newBooking = toEntity(dto);
        Room room = roomRepository.findById(dto.roomId())
                .orElseThrow(() -> new ResourceNotFoundException("Sala", dto.roomId()));
        newBooking.setRoom(room);
        
        Booking savedBooking = bookingRepository.save(newBooking);
        return toAdminDto(savedBooking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingPublicDto> getPublicBookingsByRoom(Integer roomId) {
        List<Booking> approvedBookings = bookingRepository.findByRoomIdAndStatus(
            roomId, 
            BookingStatus.APROVADO
        );
        return approvedBookings.stream()
                .map(this::toPublicDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingAdminDto> findBookingsWithFilters(String status, Integer roomId, LocalDate date) {
        Specification<Booking> spec = Specification
                .where(BookingSpecifications.hasStatus(status))
                .and(BookingSpecifications.hasRoomId(roomId))
                .and(BookingSpecifications.hasDate(date));

        List<Booking> bookings = bookingRepository.findAll(spec);
        return bookings.stream()
                .map(this::toAdminDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BookingAdminDto getBookingById(Integer id) {
        Booking booking = findEntityById(id);
        return toAdminDto(booking);
    }

    @Override
    @Transactional
    public BookingAdminDto approveBooking(Integer id) {
        Booking booking = findEntityById(id);

        if (booking.getStatus() != BookingStatus.PENDENTE) {
            throw new IllegalStateException("Só é possível APROVAR agendamentos com status PENDENTE.");
        }
        booking.setStatus(BookingStatus.APROVADO);
        
        Booking updatedBooking = bookingRepository.save(booking);
        emailService.sendBookingApprovedEmail(updatedBooking); 
        return toAdminDto(updatedBooking);
    }

    @Override
    @Transactional
    public BookingAdminDto rejectBooking(Integer id, String reason) {
        Booking booking = findEntityById(id);

        if (booking.getStatus() == BookingStatus.REJEITADO) {
            throw new IllegalStateException("Este agendamento já está rejeitado.");
        }
        
        booking.setStatus(BookingStatus.REJEITADO);
        
        Booking updatedBooking = bookingRepository.save(booking);
        emailService.sendBookingRejectedEmail(updatedBooking, reason); 
        return toAdminDto(updatedBooking);
    }

    @Override
    @Transactional
    public void deleteBooking(Integer id) {
        Booking booking = findEntityById(id);
        bookingRepository.delete(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoomScheduleDto> findAvailableRooms(LocalDateTime startRange, LocalDateTime endRange) {
        if (startRange.isAfter(endRange)) {
            throw new IllegalArgumentException("A data inicial deve ser anterior à data final.");
        }

        List<Room> allRooms = roomRepository.findAll();
        List<Booking> approvedBookings = bookingRepository.findAllApprovedOverlapping(startRange, endRange);
        
        List<OperatingHour> weeklyRules = operatingHourRepository.findAll();
        
        List<BlockedSlot> specificBlocks = blockedSlotRepository.findAllBetween(startRange, endRange);

        List<RoomScheduleDto> result = new ArrayList<>();

        for (Room room : allRooms) {
            List<Booking> roomBookings = approvedBookings.stream()
                    .filter(b -> b.getRoom().getId().equals(room.getId()))
                    .toList();

            List<DayScheduleDto> daysSchedule = new ArrayList<>();
            LocalDate currentDay = startRange.toLocalDate();
            LocalDate lastDay = endRange.toLocalDate();

            while (!currentDay.isAfter(lastDay)) {
                
                DayOfWeek dayOfWeek = currentDay.getDayOfWeek();
                OperatingHour rule = weeklyRules.stream()
                    .filter(r -> r.getDayOfWeek() == dayOfWeek)
                    .findFirst().orElse(null);

                if (rule == null || Boolean.TRUE.equals(rule.getIsClosed())) {
                    currentDay = currentDay.plusDays(1);
                    continue;
                }

                if (isDayBlocked(currentDay, specificBlocks)) {
                    currentDay = currentDay.plusDays(1);
                    continue;
                }

                List<String> morningSlots = generateSlotsForShift(
                    currentDay, rule.getMorningStart(), rule.getMorningEnd(), 
                    roomBookings, specificBlocks
                );

                List<String> afternoonSlots = generateSlotsForShift(
                    currentDay, rule.getAfternoonStart(), rule.getAfternoonEnd(), 
                    roomBookings, specificBlocks
                );

                if (!morningSlots.isEmpty() || !afternoonSlots.isEmpty()) {
                    daysSchedule.add(new DayScheduleDto(
                        currentDay.toString(),
                        morningSlots,
                        afternoonSlots
                    ));
                }

                currentDay = currentDay.plusDays(1);
            }

            if (!daysSchedule.isEmpty()) {
                result.add(new RoomScheduleDto(
                    room.getId(), 
                    room.getName(), 
                    room.getCapacity(), 
                    daysSchedule
                ));
            }
        }
        return result;
    }


    private List<String> generateSlotsForShift(
            LocalDate date, LocalTime startShift, LocalTime endShift, 
            List<Booking> bookings, List<BlockedSlot> blocks) {
        
        List<String> availableSlots = new ArrayList<>();
        if (startShift == null || endShift == null) return availableSlots;

        LocalDateTime slotStart = LocalDateTime.of(date, startShift);

        while (slotStart.toLocalTime().isBefore(endShift)) {
            LocalDateTime slotEnd = slotStart.plusHours(1);

            if (slotEnd.toLocalTime().isAfter(endShift)) break;

            boolean isBooked = !isSlotFree(slotStart, slotEnd, bookings);
            
            boolean isBlockedByAdmin = !isSlotFreeFromBlocks(slotStart, slotEnd, blocks);

            if (!isBooked && !isBlockedByAdmin) {
                String formattedSlot = String.format("%s - %s", slotStart.toLocalTime(), slotEnd.toLocalTime());
                availableSlots.add(formattedSlot);
            }
            slotStart = slotStart.plusHours(1);
        }
        return availableSlots;
    }

    private boolean isDayBlocked(LocalDate date, List<BlockedSlot> blocks) {
        return blocks.stream().anyMatch(b -> 
            Boolean.TRUE.equals(b.getIsAllDay()) && 
            b.getStartDateTime().toLocalDate().equals(date)
        );
    }

    private boolean isSlotFree(LocalDateTime slotStart, LocalDateTime slotEnd, List<Booking> bookings) {
        for (Booking b : bookings) {
            if (slotStart.isBefore(b.getEndTime()) && slotEnd.isAfter(b.getStartTime())) {
                return false; 
            }
        }
        return true; 
    }

    private boolean isSlotFreeFromBlocks(LocalDateTime start, LocalDateTime end, List<BlockedSlot> blocks) {
        for (BlockedSlot b : blocks) {
            if (start.isBefore(b.getEndDateTime()) && end.isAfter(b.getStartDateTime())) {
                return false; 
            }
        }
        return true;
    }

    private Booking findEntityById(Integer id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento", id));
    }

    private BookingAdminDto toAdminDto(Booking booking) {
        return new BookingAdminDto(
            booking.getId(),
            booking.getRoom().getId(),
            booking.getRoom().getName(),
            booking.getStartTime(),
            booking.getEndTime(),
            booking.getUserName(),
            booking.getUserEmail(),
            booking.getUserInstitution(),
            booking.getPurpose(),
            booking.getStatus()
        );
    }
    
    private BookingPublicDto toPublicDto(Booking booking) {
        return new BookingPublicDto(
            booking.getId(),
            booking.getStartTime(),
            booking.getEndTime()
        );
    }

    private Booking toEntity(BookingRequestDto dto) {
        Booking entity = new Booking();
        entity.setStartTime(dto.startTime());
        entity.setEndTime(dto.endTime());
        entity.setUserName(dto.userName());
        entity.setUserEmail(dto.userEmail());
        entity.setUserInstitution(dto.userInstitution());
        entity.setPurpose(dto.purpose());
        return entity;
    }
}