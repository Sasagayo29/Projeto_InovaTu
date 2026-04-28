package br.com.inovatu.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.inovatu.dto.ProposalDto;
import br.com.inovatu.dto.ReplyDto;
import br.com.inovatu.service.ProposalService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/proposals")
public class AdminProposalController {

    @Autowired
    private ProposalService proposalService;

    @GetMapping
    public ResponseEntity<List<ProposalDto>> getAllProposals() {
        return ResponseEntity.ok(proposalService.getAllProposals());
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<Void> replyProposal(@PathVariable Integer id, @RequestBody @Valid ReplyDto dto) {
        proposalService.replyToProposal(id, dto);
        return ResponseEntity.ok().build();
    }
}