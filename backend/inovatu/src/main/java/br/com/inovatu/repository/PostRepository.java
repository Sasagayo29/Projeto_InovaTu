package br.com.inovatu.repository;

import br.com.inovatu.model.Admin;
import br.com.inovatu.model.Post;
import br.com.inovatu.model.enuns.PostType;
import br.com.inovatu.model.enuns.PostType;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findAllByAdminId(Integer adminId);
    Integer admin(Admin admin);
    List<Post> findByPostType(PostType postType, Pageable pageable);
}
