package br.com.inovatu.model;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import br.com.inovatu.model.enuns.SubmissionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "contact_submissions")
@Data
public class ContactSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String subject;

    @Lob
    @Column(nullable = false)
    private String message;

    @Enumerated(EnumType.STRING) 
    @Column(nullable = false)
    private SubmissionStatus status = SubmissionStatus.NOVO;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
    
}
