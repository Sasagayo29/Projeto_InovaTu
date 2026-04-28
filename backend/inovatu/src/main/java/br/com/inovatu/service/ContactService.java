package br.com.inovatu.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.inovatu.dto.ContactFormDto;
import br.com.inovatu.dto.ContactSubmissionDto;
import br.com.inovatu.dto.ReplyDto;
import br.com.inovatu.exception.ResourceNotFoundException;
import br.com.inovatu.model.ContactSubmission;
import br.com.inovatu.model.enuns.SubmissionStatus;
import br.com.inovatu.repository.ContactSubmissionRepository;


@Service
public class ContactService {

    @Autowired
    private ContactSubmissionRepository repository;

    @Autowired
    private RecaptchaService recaptchaService;

    @Autowired
    private EmailService emailService;

    public void saveSubmission(ContactFormDto dto) {
        recaptchaService.validateToken(dto.recaptchaToken());
        ContactSubmission submission = new ContactSubmission();
        submission.setName(dto.name());
        submission.setEmail(dto.email());
        submission.setSubject(dto.subject());
        submission.setMessage(dto.message());
        repository.save(submission);

    }

    private ContactSubmissionDto toDto(ContactSubmission s) {
        return new ContactSubmissionDto(s.getId(), s.getName(), s.getEmail(), s.getSubject(), s.getMessage(), s.getStatus(), s.getCreatedAt());
    }

    @Transactional(readOnly = true)
    public List<ContactSubmissionDto> getAllSubmissions() {
        return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public void replyToContact(Integer id, ReplyDto dto) {

        ContactSubmission contact = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contato", id));

        emailService.sendSimpleEmail(contact.getEmail(), dto.subject(), dto.message());
        contact.setStatus(SubmissionStatus.LIDO);
        repository.save(contact);
    }
}
