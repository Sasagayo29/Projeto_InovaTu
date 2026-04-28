package br.com.inovatu.repository;

import br.com.inovatu.model.ContactSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactSubmissionRepository extends JpaRepository<ContactSubmission, Integer> {
}
