package com.anichew.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:3000","https://i5b204.p.ssafy.io")
				.allowedMethods("*")
				.allowedHeaders("Content-Type","X-AUTH-TOKEN","Authorization","Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.exposedHeaders("Content-Disposition","X-AUTH-TOKEN","Authorization","Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.allowCredentials(true);
	}
	

}
