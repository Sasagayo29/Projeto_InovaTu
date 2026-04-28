package br.com.inovatu.repository;

import br.com.inovatu.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findAllByImageableIdAndImageableType(Integer imageableId, String imageableType);
    void deleteAllByImageableIdAndImageableType(Integer imageableId, String imageableType);
}