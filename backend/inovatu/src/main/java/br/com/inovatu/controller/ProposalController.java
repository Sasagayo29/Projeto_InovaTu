package br.com.inovatu.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.inovatu.dto.ProposalDto;
import br.com.inovatu.dto.ProposalRequestDto;
import br.com.inovatu.service.ProposalService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;

    @PostMapping
    public ResponseEntity<ProposalDto> createProposal(@RequestBody @Valid ProposalRequestDto dto) {
        ProposalDto createdProposal = proposalService.createProposal(dto);
        
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/admin/proposals/{id}")
                .buildAndExpand(createdProposal.id())
                .toUri();

        return ResponseEntity.created(location).body(createdProposal);
    }
}