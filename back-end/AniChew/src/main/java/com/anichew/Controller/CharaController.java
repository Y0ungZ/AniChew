package com.anichew.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anichew.Request.ReviewRequest;
import com.anichew.Request.ScoreRequest;
import com.anichew.Response.CharaDetailResponse;
import com.anichew.Response.FavoriteResponse;
import com.anichew.Response.ReviewResponse;
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
	
	
	@GetMapping(value="/{charaid}/reviews")
	public ResponseEntity<List<ReviewResponse>> getReviews (@PathVariable("charaid") long charaid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		List<ReviewResponse> response = null;
		
		if(!charaService.existsChara(charaid)) 
			return new ResponseEntity<List<ReviewResponse>>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		response = charaService.getReviews(httpServletReq, charaid);
	
		
		return new ResponseEntity<List<ReviewResponse>>(response,HttpStatus.OK);
	}
	
	
	@GetMapping(value="/{charaid}/review")
	public ResponseEntity<ReviewResponse> getMyReview (@PathVariable("charaid") long charaid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<ReviewResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) 
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		
		if(!charaService.existsReview(httpServletReq, charaid))
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NO_CONTENT);
		
		response = charaService.getMyReview(httpServletReq, charaid);
	
		
		return new ResponseEntity<ReviewResponse>(response,HttpStatus.OK);
	}
	
	
	@PostMapping(value="/{charaid}/review")
	public ResponseEntity<ReviewResponse> writeReview (@PathVariable("charaid") long charaid, @RequestBody ReviewRequest reviewReq, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<ReviewResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) 
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);	
		
		if(charaService.existsReview(httpServletReq, charaid))
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);
		
		response = charaService.writeReview(httpServletReq, reviewReq.getContent(), charaid);
	
		
		return new ResponseEntity<ReviewResponse>(response,HttpStatus.OK);
	}
	
	@PutMapping(value="/{charaid}/review")
	public ResponseEntity<ReviewResponse> modifyReview (@PathVariable("charaid") long charaid, @RequestBody ReviewRequest reviewReq, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<ReviewResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) 
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		response = charaService.modifyReview(httpServletReq, reviewReq, charaid);
		
		if(response == null)
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		return new ResponseEntity<ReviewResponse>(response,HttpStatus.OK);
	}
	
	@DeleteMapping(value="/{charaid}/review")
	public ResponseEntity<String> deleteReview (@PathVariable("charaid") long charaid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>("NOT FOUND TOKEN", HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) 
			return new ResponseEntity<String>("NOT ACCEPTABLE",HttpStatus.NOT_ACCEPTABLE);
		
		
		if(!charaService.deleteReview(httpServletReq, charaid))
			return new ResponseEntity<String>("NOT ACCEPTABLE",HttpStatus.NOT_ACCEPTABLE);		
		
		
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	
	
	@PostMapping(value="/{charaid}/review/{reviewid}/love")
	public ResponseEntity<String> setReviewLove (@PathVariable("charaid") long charaid, @PathVariable("reviewid") long reviewid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
				
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>("NOT FOUND TOKEN", HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) 
			return new ResponseEntity<String>("NOT FOUND ANIME",HttpStatus.NOT_ACCEPTABLE);	
		
		if(!charaService.existsReview(reviewid))
			return new ResponseEntity<String>("NOT FOUND REVIEW",HttpStatus.NOT_ACCEPTABLE);
		
		if(charaService.exsitsReviewLove(httpServletReq, reviewid))
			return new ResponseEntity<String>("NOT FOUND REVIEW",HttpStatus.NOT_ACCEPTABLE);
		
		charaService.reviewLove(httpServletReq, reviewid);
					
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	
	@DeleteMapping(value="/{charaid}/review/{reviewid}/love")
	public ResponseEntity<String> deleteReviewLove (@PathVariable("charaid") long charaid, @PathVariable("reviewid") long reviewid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>("NOT FOUND TOKEN", HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) 
			return new ResponseEntity<String>("NOT FOUND ANIME",HttpStatus.NOT_ACCEPTABLE);	
		
		if(!charaService.existsReview(reviewid))
			return new ResponseEntity<String>("NOT FOUND REVIEW",HttpStatus.NOT_ACCEPTABLE);
		
		if(!charaService.exsitsReviewLove(httpServletReq, reviewid))
			return new ResponseEntity<String>("NOT FOUND REVIEW",HttpStatus.NOT_ACCEPTABLE);
		
		charaService.deleteReviewLove(httpServletReq, reviewid);
					
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	
	

}
