package br.com.inovatu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.inovatu.dto.ContactFormDto;
import br.com.inovatu.service.ContactService;
import jakarta.validation.Valid;

import java.util.Map; 

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<Map<String, String>> submitForm(@RequestBody @Valid ContactFormDto formDto) {
        contactService.saveSubmission(formDto);
        
        return ResponseEntity.ok(Map.of("message", "Sucesso"));
    }
}