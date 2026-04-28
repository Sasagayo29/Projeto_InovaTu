package br.com.inovatu.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.inovatu.dto.ProposalDto;
import br.com.inovatu.dto.ProposalRequestDto;
import br.com.inovatu.dto.ReplyDto;
import br.com.inovatu.exception.ResourceNotFoundException;
import br.com.inovatu.model.Proposal;
import br.com.inovatu.model.enuns.ProposalStatus;
import br.com.inovatu.repository.ProposalRepository;

@Service
public class ProposalService {

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private RecaptchaService recaptchaService;

    @Autowired
    private EmailService emailService;

    private ProposalDto toDto(Proposal p) {
        return new ProposalDto(
            p.getId(), 
            p.getName(), 
            p.getEmail(), 
            p.getWhatsapp(), 
            p.getProposerType(), 
            p.getDescription(),
            p.getStatus(), 
            p.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public List<ProposalDto> getAllProposals() {
        return proposalRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public ProposalDto createProposal(ProposalRequestDto dto) {
        
        recaptchaService.validateToken(dto.recaptchaToken());
        
        Proposal proposal = new Proposal();
        proposal.setName(dto.name());
        proposal.setEmail(dto.email());
        proposal.setWhatsapp(dto.whatsapp());
        proposal.setDescription(dto.description());
        proposal.setProposerType(dto.proposerType());
        
        proposal.setStatus(ProposalStatus.NOVO);

        Proposal savedProposal = proposalRepository.save(proposal);
        return toDto(savedProposal);
    }

    @Transactional
    public void replyToProposal(Integer id, ReplyDto dto) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposta", id));

        emailService.sendSimpleEmail(proposal.getEmail(), dto.subject(), dto.message());
        proposal.setStatus(ProposalStatus.CONTATADO);
        proposalRepository.save(proposal);
    }
}