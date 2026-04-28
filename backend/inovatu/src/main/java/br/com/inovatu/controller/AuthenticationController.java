package br.com.inovatu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.inovatu.dto.AuthResponseDto;
import br.com.inovatu.dto.LoginRequestDto;
import br.com.inovatu.model.Admin;
import br.com.inovatu.service.TokenService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody @Valid LoginRequestDto loginData) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(loginData.email(), loginData.password());
        
        var auth = this.authenticationManager.authenticate(usernamePassword);
        
        var token = tokenService.generateToken((Admin) auth.getPrincipal());
        
        return ResponseEntity.ok(new AuthResponseDto(token));
    }
}
