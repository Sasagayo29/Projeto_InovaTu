package br.com.inovatu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.inovatu.dto.PartnerDto;
import br.com.inovatu.service.PartnerService;

@RestController
@RequestMapping("/api/partners")
public class PartnerController {

    @Autowired
    private PartnerService partnerService;

    @GetMapping
    public ResponseEntity<List<PartnerDto>> getActivePartners() {
        return ResponseEntity.ok(partnerService.getActivePartners());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartnerDto> getActivePartnerById(@PathVariable Integer id) {
        return ResponseEntity.ok(partnerService.findActiveById(id));
    }
}
