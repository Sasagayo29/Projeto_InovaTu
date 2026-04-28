package br.com.inovatu.controller.admin;

import br.com.inovatu.dto.PostRequestDto;
import br.com.inovatu.dto.PostResponseDto;
import br.com.inovatu.model.Post;
import br.com.inovatu.service.PartnerService;
import br.com.inovatu.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import br.com.inovatu.model.enuns.PostType;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/admin/posts")
public class AdminPostController {

    @Autowired

    private PostService postService;

    @PostMapping
    public ResponseEntity<PostResponseDto> createPost(@RequestBody @Valid PostRequestDto postRequestDto) {
       PostResponseDto createdPost = postService.createPost(postRequestDto);

       URI location = URI.create("api/admin/posts/"+createdPost.id());

       return ResponseEntity.created(location).body(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDto> updatePost(@PathVariable Integer id, @RequestBody @Valid PostRequestDto postRequestDto) {
            return ResponseEntity.ok(postService.update(id, postRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Integer id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-posts")
    public ResponseEntity<List<PostResponseDto>> getMyPosts() {
        return ResponseEntity.ok(postService.getMyPosts());
    }

   
}
