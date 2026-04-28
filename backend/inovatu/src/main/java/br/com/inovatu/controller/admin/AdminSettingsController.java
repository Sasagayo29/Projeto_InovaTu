package br.com.inovatu.controller.admin;

import br.com.inovatu.dto.BlockedSlotRequestDto;
import br.com.inovatu.exception.ResourceNotFoundException;
import br.com.inovatu.model.BlockedSlot;
import br.com.inovatu.model.OperatingHour;
import br.com.inovatu.model.Room;
import br.com.inovatu.repository.BlockedSlotRepository;
import br.com.inovatu.repository.OperatingHourRepository;
import br.com.inovatu.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/settings")
public class AdminSettingsController {

    @Autowired
    private OperatingHourRepository operatingHourRepository;

    @Autowired
    private BlockedSlotRepository blockedSlotRepository;

    @Autowired
    private RoomRepository roomRepository; 


    @GetMapping("/hours")
    public ResponseEntity<List<OperatingHour>> getHours() {
        return ResponseEntity.ok(operatingHourRepository.findAll());
    }

    @PutMapping("/hours")
    public ResponseEntity<List<OperatingHour>> updateHours(@RequestBody List<OperatingHour> hours) {
        return ResponseEntity.ok(operatingHourRepository.saveAll(hours));
    }


    @GetMapping("/blocks")
    public ResponseEntity<List<BlockedSlot>> getBlocks() {
        return ResponseEntity.ok(blockedSlotRepository.findAll());
    }

    @PostMapping("/blocks")
    public ResponseEntity<BlockedSlot> createBlock(@RequestBody BlockedSlotRequestDto dto) {
        BlockedSlot block = new BlockedSlot();
        
        block.setStartDateTime(dto.startDateTime());
        block.setEndDateTime(dto.endDateTime());
        block.setReason(dto.reason());
        block.setIsAllDay(dto.isAllDay() != null ? dto.isAllDay() : false);

        if (dto.roomId() != null) {
            Room room = roomRepository.findById(dto.roomId())
                    .orElseThrow(() -> new ResourceNotFoundException("Sala", dto.roomId()));
            block.setRoom(room); 
        } else {
            block.setRoom(null); 
        }

        return ResponseEntity.ok(blockedSlotRepository.save(block));
    }

    @DeleteMapping("/blocks/{id}")
    public ResponseEntity<Void> deleteBlock(@PathVariable Integer id) {
        if (!blockedSlotRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        blockedSlotRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}