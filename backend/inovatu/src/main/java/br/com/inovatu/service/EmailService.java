package br.com.inovatu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import br.com.inovatu.model.Booking;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private final String REMETENTE = "no-reply@inovatu.com.br";

    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(REMETENTE);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail: " + e.getMessage());
        }
    }

    public void sendBookingApprovedEmail(Booking booking) {
        String subject = "Agendamento Aprovado - InovaTu";
        String text = String.format("""
            Olá, %s!
            
            Seu agendamento para a sala "%s" foi APROVADO.
            
            Detalhes:
            Data Início: %s
            Data Fim: %s
            
            Aguardamos você!
            Equipe InovaTu
            """, 
            booking.getUserName(),
            booking.getRoom().getName(),
            booking.getStartTime(),
            booking.getEndTime()
        );
        sendSimpleEmail(booking.getUserEmail(), subject, text);
    }

    public void sendBookingRejectedEmail(Booking booking, String reason) {
        String subject = "Atualização sobre seu Agendamento - InovaTu";
        String text = String.format("""
            Olá, %s.
            
            Infelizmente seu agendamento para a sala "%s" foi REJEITADO/CANCELADO.
            
            Motivo informado pelo administrador:
            "%s"
            
            Para mais informações, entre em contato conosco.
            Equipe InovaTu
            """, 
            booking.getUserName(),
            booking.getRoom().getName(),
            reason
        );
        sendSimpleEmail(booking.getUserEmail(), subject, text);
    }
}