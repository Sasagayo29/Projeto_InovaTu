package br.com.inovatu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.inovatu.model.Proposal;

public interface ProposalRepository extends JpaRepository<Proposal, Integer> {
}
