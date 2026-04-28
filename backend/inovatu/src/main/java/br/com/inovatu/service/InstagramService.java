package br.com.inovatu.service;

import br.com.inovatu.model.GalleryItem;
import br.com.inovatu.model.enuns.GalleryStatus;
import br.com.inovatu.repository.GalleryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class InstagramService {

    @Autowired
    private GalleryItemRepository repository;

    @Value("${instagram.access.token}")
    private String accessToken;

    private final String GRAPH_API_URL = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=";

    @Scheduled(fixedRate = 21600000)
    @Transactional
    public void fetchNewPosts() {
        if (accessToken == null || accessToken.contains("nada_ainda")) {
            System.out.println("Token do Instagram não configurado. Pulando sincronização.");
            return;
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = GRAPH_API_URL + accessToken;

            InstagramResponse response = restTemplate.getForObject(url, InstagramResponse.class);

            if (response != null && response.data() != null) {
                for (InstagramData data : response.data()) {
                    if (!repository.existsByInstagramId(data.id())) {
                        saveNewItem(data);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Erro ao sincronizar Instagram: " + e.getMessage());
        }
    }

    private void saveNewItem(InstagramData data) {
        GalleryItem item = new GalleryItem();
        item.setInstagramId(data.id());
        item.setMediaUrl(data.media_url());
        item.setPermalink(data.permalink());
        item.setCaption(data.caption());
        item.setMediaType(data.media_type());
        
        item.setStatus(GalleryStatus.PENDENTE);

        try {
            if (data.timestamp() != null) {
                item.setPostedAt(LocalDateTime.parse(data.timestamp(), DateTimeFormatter.ISO_DATE_TIME));
            }
        } catch (Exception e) {
            item.setPostedAt(LocalDateTime.now());
        }

        repository.save(item);
    }

    
    public record InstagramResponse(List<InstagramData> data) {}
    
    public record InstagramData(
        String id, 
        String media_type, 
        String media_url, 
        String permalink, 
        String caption, 
        String timestamp
    ) {}
}