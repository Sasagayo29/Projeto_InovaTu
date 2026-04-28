package br.com.inovatu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class InovatuApplication {

	public static void main(String[] args) {
		SpringApplication.run(InovatuApplication.class, args);
	}

}
