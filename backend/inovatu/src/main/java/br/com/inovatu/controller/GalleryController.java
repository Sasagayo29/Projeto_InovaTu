package br.com.inovatu.controller;

import br.com.inovatu.model.GalleryItem;
import br.com.inovatu.model.enuns.GalleryStatus; 
import br.com.inovatu.repository.GalleryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    @Autowired
    private GalleryItemRepository repository;

    @GetMapping
    public List<GalleryItem> getPublicGallery() {
        return repository.findByStatusOrderByPostedAtDesc(GalleryStatus.APROVADO);
    }
}