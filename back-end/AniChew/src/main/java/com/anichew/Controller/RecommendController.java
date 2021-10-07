package com.anichew.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anichew.Response.AnimeResponse;
import com.anichew.Service.RecommendService;
import com.anichew.Service.UserService;

@RestController
@RequestMapping("/recommend")
public class RecommendController {
	
	
	@Autowired
	RecommendService recommendService;
	
	@Autowired
	UserService userService;
	
	
	@GetMapping("/start")
	public ResponseEntity<List<AnimeResponse>> getFromColdstart (HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		List<AnimeResponse> response = null;
		response = recommendService.getFromColdstart();
	
		
		return new ResponseEntity<List<AnimeResponse>>(response,HttpStatus.OK);
	}
	
	
	@GetMapping("/masterpiece")
	public ResponseEntity<List<AnimeResponse>> getFromMasterpiece (HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		List<AnimeResponse> response = null;
		response = recommendService.getFromMasterpieces();
	
		
		return new ResponseEntity<List<AnimeResponse>>(response,HttpStatus.OK);
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<AnimeResponse>> getFromBaseOfUser (HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		List<AnimeResponse> response = null;
		
		if(userService.checkToken(httpServletReq))
			return new ResponseEntity<List<AnimeResponse>>(response,HttpStatus.UNAUTHORIZED);
		
		response = recommendService.getFromBaseOfUser(httpServletReq);
	
		
		return new ResponseEntity<List<AnimeResponse>>(response,HttpStatus.OK);
	}
	
	
	@GetMapping("/favorite")
	public ResponseEntity<List<AnimeResponse>> getFromBaseOfFavorite (HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		List<AnimeResponse> response = null;
		
		if(userService.checkToken(httpServletReq))
			return new ResponseEntity<List<AnimeResponse>>(response,HttpStatus.UNAUTHORIZED);
		
		
		response = recommendService.getFromBaseOfFavorite(httpServletReq);
	
		
		return new ResponseEntity<List<AnimeResponse>>(response,HttpStatus.OK);
	}
	
	@GetMapping("/anichew")
	public ResponseEntity<List<AnimeResponse>> getFromAnichew (HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		List<AnimeResponse> response = null;
		
		response = recommendService.getFromAnichew();
	
		
		return new ResponseEntity<List<AnimeResponse>>(response,HttpStatus.OK);
	}
	
}
