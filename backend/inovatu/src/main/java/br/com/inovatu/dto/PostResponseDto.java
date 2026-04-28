package br.com.inovatu.dto;

import br.com.inovatu.model.Post;
import br.com.inovatu.model.enuns.PostType;
import br.com.inovatu.model.Admin;

import java.time.Instant;
import java.util.List;

public record PostResponseDto(
        Integer id,
        String title,
        String content,
        PostType postType,
        Instant publishedAt,
        Instant createdAt,
        Instant updatedAt,
        PostAdminDto admin,
        String local,
        List<String> imageUrls

) {
    public record PostAdminDto(
            Integer id,
            String name
    ) {
        public PostAdminDto(Admin admin) {
            this(admin.getId(), admin.getName());
        }
    }
    public PostResponseDto(Post post, List<String> imageUrls) {
        this(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getPostType(),
                post.getPublishedAt(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                new PostAdminDto(post.getAdmin()),
                post.getLocal(),
                imageUrls

        );
    }
}