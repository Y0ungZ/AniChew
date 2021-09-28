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

@RestController
@RequestMapping("/recommend")
public class RecommendController {
	
	
	@Autowired
	RecommendService recommendService;
	
	
	@GetMapping("/start")
	public ResponseEntity<List<AnimeResponse>> coldStart (HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		List<AnimeResponse> response = null;
		response = recommendService.recommnedStart();
	
		
		return new ResponseEntity<List<AnimeResponse>>(response,HttpStatus.OK);
	}
	
	
}
