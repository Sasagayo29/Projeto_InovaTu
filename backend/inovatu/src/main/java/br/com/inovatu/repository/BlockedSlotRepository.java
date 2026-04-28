package br.com.inovatu.repository;

import br.com.inovatu.model.BlockedSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BlockedSlotRepository extends JpaRepository<BlockedSlot, Integer> {

    @Query("SELECT b FROM BlockedSlot b WHERE b.startDateTime < :endRange AND b.endDateTime > :startRange")
    List<BlockedSlot> findAllBetween(
        @Param("startRange") LocalDateTime startRange, 
        @Param("endRange") LocalDateTime endRange
    );
}