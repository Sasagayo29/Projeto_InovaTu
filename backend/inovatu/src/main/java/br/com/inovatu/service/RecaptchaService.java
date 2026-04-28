package br.com.inovatu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import br.com.inovatu.dto.RecaptchaResponseDto;
import br.com.inovatu.exception.InvalidRecaptchaException;

@Service
public class RecaptchaService {

    @Value("${google.recaptcha.secret-key}")
    private String recaptchaSecret;
    private static final String GOOGLE_RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    private static final double RECAPTCHA_MIN_SCORE = 0.5;

    @Autowired
    private RestTemplate restTemplate;

    public void validateToken(String recaptchaToken) {
        String url = GOOGLE_RECAPTCHA_VERIFY_URL + "?secret=" + recaptchaSecret + "&response=" + recaptchaToken;
        RecaptchaResponseDto response = restTemplate.postForObject(url, null, RecaptchaResponseDto.class);

        if (response == null) {
            throw new InvalidRecaptchaException("Falha na comunicação com o serviço reCAPTCHA.");
        }
        if (!response.success() || response.score() < RECAPTCHA_MIN_SCORE) {
            throw new InvalidRecaptchaException("Validação reCAPTCHA falhou. Score: " + response.score());
        }
    }
}
