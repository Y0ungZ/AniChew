package com.anichew;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AniChewApplication {

	public static void main(String[] args) {
		SpringApplication.run(AniChewApplication.class, args);
	}

}
