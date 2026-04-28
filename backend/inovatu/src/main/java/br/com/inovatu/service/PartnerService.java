package br.com.inovatu.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.inovatu.dto.PartnerDto;
import br.com.inovatu.exception.ResourceNotFoundException;
import br.com.inovatu.model.Partner;
import br.com.inovatu.repository.PartnerRepository;

@Service
public class PartnerService {

    @Autowired
    private PartnerRepository partnerRepository;

    private PartnerDto toDto(Partner partner) {
        return new PartnerDto(partner.getId(), partner.getName(), partner.getDescription(), partner.getLogoUrl(), partner.getWebsiteUrl(), partner.isActive());
    }

    
    @Transactional(readOnly = true)
    public List<PartnerDto> getActivePartners() {
        return partnerRepository.findAllByIsActiveTrue().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    
    @Transactional(readOnly = true)
    public List<PartnerDto> getAllPartners() {
        return partnerRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public PartnerDto createPartner(PartnerDto dto) {
        Partner partner = new Partner();
        partner.setName(dto.name());
        partner.setDescription(dto.description());
        partner.setLogoUrl(dto.logoUrl());
        partner.setWebsiteUrl(dto.websiteUrl());
        partner.setActive(dto.isActive());
        
        Partner savedPartner = partnerRepository.save(partner);
        return toDto(savedPartner);
    }

    @Transactional(readOnly = true)
    public PartnerDto findById(Integer id) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parceiro com ID " + id + " não encontrado."));
        return toDto(partner);
    }
    
    @Transactional
    public PartnerDto updatePartner(Integer id, PartnerDto dto) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parceiro com ID " + id + " não encontrado."));
        
        partner.setName(dto.name());
        partner.setDescription(dto.description());
        partner.setLogoUrl(dto.logoUrl());
        partner.setWebsiteUrl(dto.websiteUrl());
        partner.setActive(dto.isActive());
        
        Partner updatedPartner = partnerRepository.save(partner);
        return toDto(updatedPartner);
    }
    @Transactional
    public void deletePartner(Integer id) {
        if (!partnerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Parceiro com ID " + id + " não encontrado.");
        }
        partnerRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public PartnerDto findActiveById(Integer id) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parceiro com ID " + id + " não encontrado."));

        if (!partner.isActive()) {
            throw new ResourceNotFoundException("ParceGiro com ID " + id + " não está ativo.");
        }
        return toDto(partner);
    }
}
