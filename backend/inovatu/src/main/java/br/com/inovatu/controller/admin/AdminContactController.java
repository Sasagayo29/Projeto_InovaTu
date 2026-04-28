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

import br.com.inovatu.dto.ContactSubmissionDto;
import br.com.inovatu.dto.ReplyDto;
import br.com.inovatu.service.ContactService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/contacts")
public class AdminContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public ResponseEntity<List<ContactSubmissionDto>> getAllSubmissions() {
        return ResponseEntity.ok(contactService.getAllSubmissions());
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<Void> replyContact(@PathVariable Integer id, @RequestBody @Valid ReplyDto dto) {
        contactService.replyToContact(id, dto);
        return ResponseEntity.ok().build();
    }
}
