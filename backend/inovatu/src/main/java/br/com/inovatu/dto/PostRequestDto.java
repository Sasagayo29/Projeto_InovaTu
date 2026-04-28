package br.com.inovatu.dto;

import java.util.List;

import br.com.inovatu.model.enuns.PostType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PostRequestDto(
        @NotBlank(message = "O título não pode ser vazio.")
        String title,

        @NotBlank(message = "O conteúdo não pode ser vazio.")
        String content,

        @NotNull(message = "O tipo do post é obrigatório.")
        PostType postType,

        String local,
        List<String> imageUrls

) {}