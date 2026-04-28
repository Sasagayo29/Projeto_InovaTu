package br.com.inovatu.controller;

import br.com.inovatu.dto.PostResponseDto;
import br.com.inovatu.model.enuns.PostType;
import br.com.inovatu.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable Integer id) {
        return ResponseEntity.ok(postService.findById(id));
    }

    @GetMapping("/by-admin/{adminId}")
    public ResponseEntity<List<PostResponseDto>> getPostsByAdminId(@PathVariable Integer adminId) {
        return ResponseEntity.ok(postService.findByAdminId(adminId));
    }

     @GetMapping("/recent/news")
    public ResponseEntity<List<PostResponseDto>> getRecentNews(
            @RequestParam(defaultValue = "3") Integer limit
    ) {
        return ResponseEntity.ok(postService.getRecentPostsByType(PostType.NOTICIA, limit));
    }

    @GetMapping("/recent/events")
    public ResponseEntity<List<PostResponseDto>> getRecentEvents(
            @RequestParam(defaultValue = "3") Integer limit
    ) {
        return ResponseEntity.ok(postService.getRecentPostsByType(PostType.EVENTO, limit));
    }
}
