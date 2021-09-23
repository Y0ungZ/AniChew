package com.anichew.Controller;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anichew.Service.KaKaoAPI;
import com.anichew.Service.UserService;

import io.swagger.annotations.ApiOperation;


@RequestMapping("oauth/")
@RestController
public class OAuthController {
	
	@Autowired
	private KaKaoAPI kakao;
	
	@Autowired
	private UserService userService;
	
	@ApiOperation("로그인")
	@GetMapping(value="/login")
	public ResponseEntity<String> login (@RequestParam("code") String code, HttpServletResponse httpServletRes) {
		System.out.println("Code = "+code);
		String access_token = kakao.getAccessToken(code);		
		Map<String,Object> userInfo = kakao.getUserInfo(access_token);
				
		
		if(userService.isNewUser(Long.parseLong((String)userInfo.get("id")))) {
			userService.signUp(userInfo);
		}
		
		String jwt = userService.generateToken(httpServletRes, (String)userInfo.get("id"));
		
		return new ResponseEntity<String>(jwt,HttpStatus.OK);
	}
	
	@GetMapping(value="/logout")
	public ResponseEntity<String> logout (HttpSession session) {
		String access_token = (String)session.getAttribute("access_token");
		kakao.kakaoLogout(access_token);
		session.removeAttribute("access_token");
		
		return new ResponseEntity<String>("hello",HttpStatus.OK);
	}
	
	@GetMapping(value="/test")
	public ResponseEntity<String> test (HttpSession session) {

		return new ResponseEntity<String>("test",HttpStatus.OK);
	}
	
	
}
