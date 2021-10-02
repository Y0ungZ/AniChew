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
import com.anichew.Response.AnimeDetailResponse;
import com.anichew.Response.AnimescoreResponse;
import com.anichew.Response.FavoriteResponse;
import com.anichew.Response.ReviewResponse;
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
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) {
			return new ResponseEntity<String>("WRONG ANIME",HttpStatus.BAD_REQUEST);
		}
		
		if(!animeService.existsAnimerate(httpServletReq, animeid)) {
			return new ResponseEntity<String>("WRONG ANIME1",HttpStatus.NOT_FOUND);
		}
		
		animeService.deleteRate(httpServletReq, animeid);
		
	
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	
	
	
	
	@GetMapping(value="/{animeid}/reviews")
	public ResponseEntity<List<ReviewResponse>> getReviews (@PathVariable("animeid") long animeid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		List<ReviewResponse> response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<List<ReviewResponse>>(response, HttpStatus.UNAUTHORIZED);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) 
			return new ResponseEntity<List<ReviewResponse>>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		response = animeService.getReviews(httpServletReq, animeid);
	
		
		return new ResponseEntity<List<ReviewResponse>>(response,HttpStatus.OK);
	}
	
	
	@GetMapping(value="/{animeid}/review")
	public ResponseEntity<ReviewResponse> getMyReview (@PathVariable("animeid") long animeid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<ReviewResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) 
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		
		if(!animeService.existsReview(httpServletReq, animeid))
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NO_CONTENT);
		
		response = animeService.getMyReview(httpServletReq, animeid);
	
		
		return new ResponseEntity<ReviewResponse>(response,HttpStatus.OK);
	}
	
	
	@PostMapping(value="/{animeid}/review")
	public ResponseEntity<ReviewResponse> writeReview (@PathVariable("animeid") long animeid, @RequestBody ReviewRequest reviewReq, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<ReviewResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) 
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);	
		
		if(animeService.existsReview(httpServletReq, animeid))
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);
		
		response = animeService.writeReview(httpServletReq, reviewReq.getContent(), animeid);
	
		
		return new ResponseEntity<ReviewResponse>(response,HttpStatus.OK);
	}
	
	@PutMapping(value="/{animeid}/review")
	public ResponseEntity<ReviewResponse> modifyReview (@PathVariable("animeid") long animeid, @RequestBody ReviewRequest reviewReq, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<ReviewResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) 
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		response = animeService.modifyReview(httpServletReq, reviewReq, animeid);
		
		if(response == null)
			return new ResponseEntity<ReviewResponse>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		return new ResponseEntity<ReviewResponse>(response,HttpStatus.OK);
	}
	
	@DeleteMapping(value="/{animeid}/review/{reviewid}")
	public ResponseEntity<String> deleteReview (@PathVariable("animeid") long animeid, @PathVariable("reviewid") long reviewid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>("NOT FOUND TOKEN", HttpStatus.UNAUTHORIZED);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) 
			return new ResponseEntity<String>("NOT ACCEPTABLE",HttpStatus.NOT_ACCEPTABLE);
		
		
		if(!animeService.deleteReview(httpServletReq, reviewid, animeid))
			return new ResponseEntity<String>("NOT ACCEPTABLE",HttpStatus.NOT_ACCEPTABLE);		
		
		
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	
	
	@PostMapping(value="/{animeid}/review/{reviewid}/love")
	public ResponseEntity<String> setReviewLove (@PathVariable("animeid") long animeid, @PathVariable("reviewid") long reviewid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
				
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>("NOT FOUND TOKEN", HttpStatus.UNAUTHORIZED);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) 
			return new ResponseEntity<String>("NOT FOUND ANIME",HttpStatus.NOT_ACCEPTABLE);	
		
		if(!animeService.existsReview(reviewid))
			return new ResponseEntity<String>("NOT FOUND REVIEW",HttpStatus.NOT_ACCEPTABLE);
		
		if(animeService.exsitsReviewLove(httpServletReq, reviewid))
			return new ResponseEntity<String>("NOT FOUND REVIEW",HttpStatus.NOT_ACCEPTABLE);
		
		animeService.reviewLove(httpServletReq, reviewid);
					
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	
	@DeleteMapping(value="/{animeid}/review/{reviewid}/love")
	public ResponseEntity<String> deleteReviewLove (@PathVariable("animeid") long animeid, @PathVariable("reviewid") long reviewid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		ReviewResponse response = null;
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>("NOT FOUND TOKEN", HttpStatus.UNAUTHORIZED);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) 
			return new ResponseEntity<String>("NOT FOUND ANIME",HttpStatus.NOT_ACCEPTABLE);	
		
		if(!animeService.existsReview(reviewid))
			return new ResponseEntity<String>("NOT FOUND REVIEW",HttpStatus.NOT_ACCEPTABLE);
		
		if(animeService.exsitsReviewLove(httpServletReq, reviewid))
			return new ResponseEntity<String>("NOT FOUND REVIEW",HttpStatus.NOT_ACCEPTABLE);
		
		animeService.deleteReviewLove(httpServletReq, reviewid);
					
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	
	
	@PostMapping(value="/{animeid}/favorite")
	public ResponseEntity<FavoriteResponse> setFavoriteAnime (@PathVariable("animeid") long animeid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		FavoriteResponse response = new FavoriteResponse();
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<FavoriteResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!animeService.exsitsAnime(httpServletReq, animeid)) {
			response.setId(-1);
			return new ResponseEntity<FavoriteResponse>(response,HttpStatus.NOT_FOUND);
		}


		
		response.setId(animeid);
		
		if(!animeService.setFavoriteAnime(httpServletReq, animeid))			
			return new ResponseEntity<FavoriteResponse>(response,HttpStatus.NOT_ACCEPTABLE);
		
		response.setSuccess(true);
		return new ResponseEntity<FavoriteResponse>(response,HttpStatus.OK);
	}
	
	
	@DeleteMapping(value="/{animeid}/favorite")
	public ResponseEntity<FavoriteResponse> deleteFavoriteAnime (@PathVariable("animeid") long animeid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		FavoriteResponse response = new FavoriteResponse();
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<FavoriteResponse>(response, HttpStatus.UNAUTHORIZED);


		if(!animeService.exsitsAnime(httpServletReq, animeid)) {
			response.setId(-1);
			return new ResponseEntity<FavoriteResponse>(response,HttpStatus.NOT_FOUND);
		}

		response.setId(animeid);
		
		if(!animeService.deleteFavoriteAnime(httpServletReq, animeid))
			return new ResponseEntity<FavoriteResponse>(response,HttpStatus.NOT_ACCEPTABLE);		
		
		response.setSuccess(true);
		return new ResponseEntity<FavoriteResponse>(response,HttpStatus.OK);
	}
	
}
