package br.com.inovatu.repository;

import br.com.inovatu.model.OperatingHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperatingHourRepository extends JpaRepository<OperatingHour, Integer> {
}