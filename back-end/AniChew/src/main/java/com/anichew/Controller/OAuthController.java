package com.anichew.Controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anichew.Service.KaKaoAPI;


@RequestMapping("oauth/")
@RestController
public class OAuthController {
	
	@Autowired
	private KaKaoAPI kakao;
	

	
	@GetMapping(value="/login")
	public ResponseEntity<String> login (@RequestParam("code") String code, HttpSession session) {
		System.out.println(code);
		String access_token = kakao.getAccessToken(code);
		Map<String,Object> userInfo = kakao.getUserInfo(access_token);
		
		if(userInfo.get("email")!=null) {
			session.setAttribute("access_token","access_token");
		}
		
		return new ResponseEntity<String>("hello",HttpStatus.OK);
	}
	
	@GetMapping(value="/logout")
	public String logout(HttpSession session) {
		String access_token = (String)session.getAttribute("access_token");
		kakao.kakaoLogout(access_token);
		session.removeAttribute("access_token");
		
		return "index";
	}

	
}
