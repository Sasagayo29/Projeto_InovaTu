package br.com.inovatu.controller.admin;

import br.com.inovatu.model.GalleryItem;
import br.com.inovatu.model.enuns.GalleryStatus;
import br.com.inovatu.repository.GalleryItemRepository;
import br.com.inovatu.service.InstagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/gallery")
public class AdminGalleryController {

    @Autowired
    private GalleryItemRepository repository;

    @Autowired
    private InstagramService instagramService;

    @GetMapping
    public List<GalleryItem> getAllItems() {
        return repository.findAll();
    }

    @PostMapping("/sync")
    public ResponseEntity<Void> forceSync() {
        instagramService.fetchNewPosts();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<GalleryItem> approve(@PathVariable Integer id) {
        return updateStatus(id, GalleryStatus.APROVADO);
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<GalleryItem> reject(@PathVariable Integer id) {
        return updateStatus(id, GalleryStatus.REJEITADO);
    }

    private ResponseEntity<GalleryItem> updateStatus(Integer id, GalleryStatus status) {
        return repository.findById(id)
                .map(item -> {
                    item.setStatus(status);
                    return ResponseEntity.ok(repository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}