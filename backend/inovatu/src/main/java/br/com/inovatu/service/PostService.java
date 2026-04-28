package br.com.inovatu.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.com.inovatu.dto.PostRequestDto;
import br.com.inovatu.dto.PostResponseDto;
import br.com.inovatu.exception.ResourceNotFoundException;
import br.com.inovatu.model.Admin;
import br.com.inovatu.model.Image;
import br.com.inovatu.model.Post;
import br.com.inovatu.model.enuns.PostType;
import br.com.inovatu.repository.ImageRepository;
import br.com.inovatu.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ImageRepository imageRepository;

    private Post findPostByIdOrThrow(Integer id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post com id " + id + " não encontrado"));
    }

    private Admin getAuthenticatedAdmin() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof Admin) {
            return (Admin) principal;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado.");
        }
    }

    private List<String> getImagesForPost(Integer postId) {
        return imageRepository.findAllByImageableIdAndImageableType(postId, "Post")
                .stream()
                .map(Image::getUrl)
                .collect(Collectors.toList());
    }


    @Transactional
    public PostResponseDto createPost(PostRequestDto dto) {
        Admin currentUser = getAuthenticatedAdmin();

        Post post = new Post();
        post.setTitle(dto.title());
        post.setContent(dto.content());
        post.setPostType(dto.postType());
        post.setLocal(dto.local());
        post.setAdmin(currentUser);

        Post savedPost = postRepository.save(post);

        if (dto.imageUrls() != null && !dto.imageUrls().isEmpty()) {
            for (String url : dto.imageUrls()) {
                Image img = new Image();
                img.setUrl(url);
                img.setImageableId(savedPost.getId());
                img.setImageableType("Post"); 
                imageRepository.save(img);
            }
        }

        return new PostResponseDto(savedPost, dto.imageUrls());
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> getAllPosts() {
        return postRepository.findAll().stream()
                .map(post -> {
                    List<String> imageUrls = getImagesForPost(post.getId());
                    return new PostResponseDto(post, imageUrls);
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PostResponseDto findById(Integer id) {
        Post post = findPostByIdOrThrow(id);
        List<String> imageUrls = getImagesForPost(id);
        
        return new PostResponseDto(post, imageUrls);
    }

    @Transactional
    public PostResponseDto update(Integer id, PostRequestDto dto) {
        Post post = findPostByIdOrThrow(id);

        post.setTitle(dto.title());
        post.setContent(dto.content());
        post.setPostType(dto.postType());
        post.setLocal(dto.local()); 

        Post updatedPost = postRepository.save(post);

        if (dto.imageUrls() != null) {
            imageRepository.deleteAllByImageableIdAndImageableType(id, "Post");

            for (String url : dto.imageUrls()) {
                Image img = new Image();
                img.setUrl(url);
                img.setImageableId(updatedPost.getId());
                img.setImageableType("Post");
                imageRepository.save(img);
            }
        }

        return new PostResponseDto(updatedPost, dto.imageUrls());
    }

    @Transactional
    public void delete(Integer id) {
        Post post = findPostByIdOrThrow(id);
        
        imageRepository.deleteAllByImageableIdAndImageableType(id, "Post");
        
        postRepository.delete(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> getMyPosts() {
        Admin currentAdmin = getAuthenticatedAdmin();
        return findByAdminId(currentAdmin.getId());
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> findByAdminId(Integer adminId) {
        return postRepository.findAllByAdminId(adminId).stream()
                .map(post -> {
                    List<String> imageUrls = getImagesForPost(post.getId());
                    return new PostResponseDto(post, imageUrls);
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> getRecentPostsByType(PostType type, Integer limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        
        return postRepository.findByPostType(type, pageable).stream()
                .map(post -> {
                    List<String> imageUrls = getImagesForPost(post.getId());
                    return new PostResponseDto(post, imageUrls);
                })
                .collect(Collectors.toList());
    }
}