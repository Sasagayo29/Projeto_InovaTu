package br.com.inovatu.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "blocked_slots")
@Data
public class BlockedSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    private String reason;
    
    private Boolean isAllDay;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = true)
    private Room room;
}