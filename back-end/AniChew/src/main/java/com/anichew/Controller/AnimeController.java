package com.anichew.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anichew.Request.ScoreRequest;
import com.anichew.Response.AnimeDetailResponse;
import com.anichew.Response.AnimescoreResponse;
import com.anichew.Service.AnimeService;
import com.anichew.Service.UserService;

@RequestMapping("anime")
@RestController
public class AnimeController {

	@Autowired
	private AnimeService animeService;
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping(value="/{animeid}")
	public ResponseEntity<AnimeDetailResponse> getAnime (@PathVariable("animeid") long animeid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
			
		
		AnimeDetailResponse response = null;
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) {
			return new ResponseEntity<AnimeDetailResponse>(response,HttpStatus.NOT_FOUND);
		}	
		
		response = animeService.animeDetail(httpServletReq, animeid);
		
		return new ResponseEntity<AnimeDetailResponse>(response,HttpStatus.OK);
	}
	
	
	@PostMapping(value="/{animeid}/score")
	public ResponseEntity<AnimescoreResponse> doAnimeRate (@PathVariable("animeid") long animeid, @RequestBody ScoreRequest scoreReq, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		AnimescoreResponse response = new AnimescoreResponse();
		float score = scoreReq.getScore();
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<AnimescoreResponse>(response, HttpStatus.UNAUTHORIZED);
		
		System.out.println(animeid);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) {
			return new ResponseEntity<AnimescoreResponse>(response,HttpStatus.NOT_FOUND);
		}
		
		if(score > 10 || score < 0)
			return new ResponseEntity<AnimescoreResponse>(response,HttpStatus.BAD_REQUEST);
		
		
		response = animeService.rateAnime(httpServletReq, animeid, score);
		
		
		return new ResponseEntity<AnimescoreResponse>(response,HttpStatus.OK);
	}
	
	@DeleteMapping(value="/{animeid}/score")
	public ResponseEntity<String> deleteAnimeRate (@PathVariable("animeid") long animeid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>("NOT FOUND TOKEN", HttpStatus.UNAUTHORIZED);
		
		if(animeService.exsitsAnime(httpServletReq, animeid)) {
			return new ResponseEntity<String>("WRONG ANIME",HttpStatus.BAD_REQUEST);
		}
		
		if(animeService.existsAnimerate(httpServletReq, animeid)) {
			return new ResponseEntity<String>("WRONG ANIME",HttpStatus.NOT_FOUND);
		}
		
		animeService.deleteRate(httpServletReq, animeid);
		
	
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
}
