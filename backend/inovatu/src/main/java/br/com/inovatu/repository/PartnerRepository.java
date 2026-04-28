package br.com.inovatu.repository;

import br.com.inovatu.model.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Integer> {
    List<Partner> findAllByIsActiveTrue();
}
