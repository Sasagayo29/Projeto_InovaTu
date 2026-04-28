package br.com.inovatu.config;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import br.com.inovatu.model.Admin;
import br.com.inovatu.repository.AdminRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (adminRepository.findByEmail("admin@movimentoinovatu.com.br").isEmpty()) {
            
            logger.info("Nenhum administrador encontrado, criando usuário padrão...");

            Admin admin = new Admin();
            admin.setName("Admin Inovatu");
            admin.setEmail("admin@movimentoinovatu.com.br");
            admin.setPasswordHash(passwordEncoder.encode("admin123")); 
            
            adminRepository.save(admin);
            
            logger.info("Usuário administrador padrão criado com sucesso.");
            logger.info("Email: {}", "admin@movimentoinovatu.com.br");
            logger.warn("Senha padrão definida. Recomenda-se a alteração no primeiro login.");
        } else {
            logger.info("Usuário administrador já existe. Nenhuma ação necessária.");
        }
    }
}
