package br.com.inovatu.repository;

import br.com.inovatu.model.GalleryItem;
import br.com.inovatu.model.enuns.GalleryStatus; 
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GalleryItemRepository extends JpaRepository<GalleryItem, Integer> {
    
    boolean existsByInstagramId(String instagramId);

    List<GalleryItem> findByStatusOrderByPostedAtDesc(GalleryStatus status);
}