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
import com.anichew.Response.CharaDetailResponse;
import com.anichew.Response.FavoriteResponse;
import com.anichew.Response.ScoreResponse;
import com.anichew.Service.CharaService;
import com.anichew.Service.UserService;

@RestController
@RequestMapping("chara")
public class CharaController {
	
	@Autowired
	CharaService charaService;
	
	@Autowired
	UserService userService;
	
	
	@GetMapping(value="/{charaid}")
	public ResponseEntity<CharaDetailResponse> getAnime (@PathVariable("charaid") long charaid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
			
		
		CharaDetailResponse response = null;
		
		if(!charaService.existsChara(charaid)) {
			return new ResponseEntity<CharaDetailResponse>(response,HttpStatus.NOT_FOUND);
		}	
		
		response = charaService.charaDetail(httpServletReq, charaid);
		
		return new ResponseEntity<CharaDetailResponse>(response,HttpStatus.OK);
	}
	
	@PostMapping(value="/{charaid}/favorite")
	public ResponseEntity<FavoriteResponse> setFavorite (@PathVariable("charaid") long charaid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
			
		
		FavoriteResponse response = new FavoriteResponse();
		response.setType("CHARA");
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<FavoriteResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) {
			return new ResponseEntity<FavoriteResponse>(response,HttpStatus.NOT_FOUND);
		}
		
		response.setId(charaid);
		
		if(!charaService.setFavorite(httpServletReq, charaid))
			return new ResponseEntity<FavoriteResponse>(response,HttpStatus.NOT_ACCEPTABLE);
		
		response.setSuccess(true);
		
		return new ResponseEntity<FavoriteResponse>(response,HttpStatus.OK);
	}
	
	
	
	@DeleteMapping(value="/{charaid}/favorite")
	public ResponseEntity<FavoriteResponse> deleteFavorite (@PathVariable("charaid") long charaid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
			
		
		FavoriteResponse response = new FavoriteResponse();
		response.setType("CHARA");
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<FavoriteResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) {
			return new ResponseEntity<FavoriteResponse>(response,HttpStatus.NOT_FOUND);
		}
		
		response.setId(charaid);
		
		if(!charaService.deleteFavorite(httpServletReq, charaid))
			return new ResponseEntity<FavoriteResponse>(response,HttpStatus.NOT_ACCEPTABLE);
		
		response.setSuccess(true);
		
		return new ResponseEntity<FavoriteResponse>(response,HttpStatus.OK);
	}
	
	@PostMapping(value="/{charaid}/score")
	public ResponseEntity<ScoreResponse> setScore (@PathVariable("charaid") long charaid, @RequestBody ScoreRequest scoreReq, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
			
		
		ScoreResponse response = new ScoreResponse();
		response.setType("CHARA");
		
		
		float score = scoreReq.getScore();
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<ScoreResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) {
			return new ResponseEntity<ScoreResponse>(response,HttpStatus.NOT_FOUND);
		}
		
		response.setId(charaid);
		
		if(score > 10 || score < 0)
			return new ResponseEntity<ScoreResponse>(response,HttpStatus.BAD_REQUEST);
										
		response = charaService.setScore(httpServletReq, charaid, score);			
		
		return new ResponseEntity<ScoreResponse>(response,HttpStatus.OK);
	}
	
	
	
	@DeleteMapping(value="/{charaid}/score")
	public ResponseEntity<String> deleteScore (@PathVariable("charaid") long charaid,  HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
			
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>("NOT FOUND TOKEN", HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) {
			return new ResponseEntity<String>("NOT FOUND CHARA",HttpStatus.NOT_FOUND);
		}
		
		
		if(!charaService.exsitsCharascore(httpServletReq, charaid))
			return new ResponseEntity<String>("NOT ACCEPTABLE",HttpStatus.NOT_ACCEPTABLE);	
		
		charaService.deleteScore(httpServletReq, charaid);
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	

}
