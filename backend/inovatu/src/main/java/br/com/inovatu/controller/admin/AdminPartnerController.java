package br.com.inovatu.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.inovatu.dto.PartnerDto;
import br.com.inovatu.service.PartnerService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/partners") 
public class AdminPartnerController {

    @Autowired
    private PartnerService partnerService;

    @PostMapping
    public ResponseEntity<PartnerDto> createPartner(@RequestBody @Valid PartnerDto partnerDto) {
        return ResponseEntity.ok(partnerService.createPartner(partnerDto));
    }
    
    @GetMapping
    public ResponseEntity<List<PartnerDto>> getAllPartners() {
        return ResponseEntity.ok(partnerService.getAllPartners());
    }
    @GetMapping("/{id}")
    public ResponseEntity<PartnerDto> getPartnerById(@PathVariable Integer id) {
        return ResponseEntity.ok(partnerService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PartnerDto> updatePartner(@PathVariable Integer id, @RequestBody @Valid PartnerDto partnerDto) {
        return ResponseEntity.ok(partnerService.updatePartner(id, partnerDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePartner(@PathVariable Integer id) {
        partnerService.deletePartner(id);
        return ResponseEntity.noContent().build(); 
    }

}
