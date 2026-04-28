package br.com.inovatu.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.inovatu.dto.RoomDto;
import br.com.inovatu.exception.ResourceNotFoundException;
import br.com.inovatu.model.Room;
import br.com.inovatu.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    private RoomDto toDto(Room room) {
        return new RoomDto(room.getId(), room.getName(), room.getDescription(), room.getCapacity());
    }

    @Transactional(readOnly = true)
    public List<RoomDto> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RoomDto getRoomById(Integer id) {
        return roomRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Sala com ID " + id + " não encontrada."));
    }

    @Transactional
    public RoomDto createRoom(RoomDto dto) {
        Room room = new Room();
        room.setName(dto.name());
        room.setDescription(dto.description());
        room.setCapacity(dto.capacity());

        Room savedRoom = roomRepository.save(room);
        return toDto(savedRoom);
    }

    @Transactional
    public RoomDto updateRoom(Integer id, RoomDto dto) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sala com ID " + id + " não encontrada."));

        room.setName(dto.name());
        room.setDescription(dto.description());
        room.setCapacity(dto.capacity());

        Room updatedRoom = roomRepository.save(room);
        return toDto(updatedRoom);
    }

    @Transactional
    public void deleteRoom(Integer id) {
        if (!roomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Sala com ID " + id + " não encontrada.");
        }
        roomRepository.deleteById(id);
    }
}
