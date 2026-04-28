package br.com.inovatu.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

import br.com.inovatu.model.enuns.GalleryStatus;

@Entity
@Table(name = "gallery_items")
@Data
public class GalleryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "instagram_id", unique = true, nullable = false)
    private String instagramId;

    @Column(name = "media_url", columnDefinition = "TEXT")
    private String mediaUrl;

    private String permalink;
    
    @Column(columnDefinition = "TEXT")
    private String caption;

    @Column(name = "media_type")
    private String mediaType;

    @Enumerated(EnumType.STRING)
    private GalleryStatus status;

    @Column(name = "posted_at")
    private LocalDateTime postedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}