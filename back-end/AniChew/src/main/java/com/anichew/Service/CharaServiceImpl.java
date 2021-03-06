package com.anichew.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeChara;
import com.anichew.Entity.AnimeSeries;
import com.anichew.Entity.Chara;
import com.anichew.Entity.CharaReview;
import com.anichew.Entity.CharaReviewLove;
import com.anichew.Entity.Charascore;
import com.anichew.Entity.FavoriteChara;
import com.anichew.Entity.User;
import com.anichew.Repository.AnimeCharaRepository;
import com.anichew.Repository.AnimeSeriesRepository;
import com.anichew.Repository.CharaRepository;
import com.anichew.Repository.CharaReviewLoveRepository;
import com.anichew.Repository.CharaReviewRepository;
import com.anichew.Repository.CharascoreRepository;
import com.anichew.Repository.FavoriteCharaRepository;
import com.anichew.Repository.SeriesRepository;
import com.anichew.Repository.UserRepository;
import com.anichew.Request.ReviewRequest;
import com.anichew.Response.AnimeResponse;
import com.anichew.Response.CharaDetailResponse;
import com.anichew.Response.ReviewResponse;
import com.anichew.Response.ScoreResponse;
import com.anichew.Util.CookieUtil;
import com.anichew.Util.JwtUtil;

@Service
public class CharaServiceImpl implements CharaService {

	
	@Autowired
	private AnimeSeriesRepository animeSeriesRepo;
	
	@Autowired
	private SeriesRepository seriesRepo;
	
	@Autowired
	private AnimeCharaRepository animeCharaRepo;
	
	@Autowired
	private CharaRepository charaRepo;
	
	@Autowired
	CharascoreRepository charascoreRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private FavoriteCharaRepository favoriteCharaRepo;	
	
	@Autowired
	private CharaReviewRepository charaReviewRepo;
	
	@Autowired
	private CharaReviewLoveRepository charaReviewLoveRepo;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private CookieUtil cookieUtil;
	
	
	public CharaDetailResponse charaDetail(HttpServletRequest httpServletReq, long charaid) {		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		boolean isFavorite = false;
		
		long accessor = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		
		User user = userRepo.findById(accessor).get();
		
		
		Chara chara = charaRepo.findById(charaid);
		
		
		CharaDetailResponse response = new CharaDetailResponse(chara);
		
		
		List<AnimeChara> charaAnimes = animeCharaRepo.findAllByChara(chara);
		List<AnimeResponse> animes = new ArrayList();
		
		String series = null;
		
		for(AnimeChara charaAnime : charaAnimes) {
			AnimeResponse animeResponse = new AnimeResponse();
			Anime anime = charaAnime.getAnime();
			animeResponse.setId(anime.getId());
			animeResponse.setKoreanName(anime.getKoreanName());
			animeResponse.setName(anime.getName());
			
			animes.add(animeResponse);
			
			
		}
		AnimeSeries animeSeries = null;
		if(charaAnimes.size()>0) {
			animeSeries = animeSeriesRepo.findByAnime(charaAnimes.get(0).getAnime());
		}
		
		if(animeSeries != null)
			series = animeSeries.getSeries().getName();
		
		
		float myScore = 0;
		float avgScore = 0;
		Charascore myCharascore = null;
		boolean favorite = false;
		
		
		if(user!=null) {
			myCharascore = charascoreRepo.findByCharaAndUser(chara, user);
			favorite = favoriteCharaRepo.existsByCharaAndUser(chara, user);
		}
		
		if(myCharascore !=null) 
			myScore = myCharascore.getScore();
		
		List<Charascore> charascores = charascoreRepo.findAllByChara(chara);
		
		int scores[] = new int[5];
		
		for(Charascore charascore : charascores) {
			if(charascore.getScore() == 1 || charascore.getScore() == 2)
				scores[0]++;
			else if(charascore.getScore() == 3 || charascore.getScore() == 4)
				scores[1]++;
			else if(charascore.getScore() == 5 || charascore.getScore() == 6)
				scores[2]++;
			else if(charascore.getScore() == 7 || charascore.getScore() == 8)
				scores[3]++;
			else if(charascore.getScore() == 9 || charascore.getScore() == 10)
				scores[4]++;
			
			avgScore += charascore.getScore();
		}
		
		if(charascores.size() > 0)
			avgScore /= charascores.size();
		
		
		response.setSeries(series);				
		response.setAnimes(animes);
		response.setMyScore(myScore);
		response.setAvgScore(avgScore);
		response.setScores(scores);		
		response.setFavorite(favorite);
		
		return response;
	}

	@Override
	public boolean existsChara(long charaid) {
		
		return charaRepo.existsById(charaid);
	}
		
	public boolean setFavorite(HttpServletRequest httpServletReq, long charaid) {
		boolean isFavorite = false;		
		
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Chara chara = charaRepo.findById(charaid);
		
		if(favoriteCharaRepo.existsByCharaAndUser(chara, user))		
			return false;
		
		FavoriteChara favoriteChara = FavoriteChara.builder()
				.chara(chara)
				.user(user)
				.build();
		
		favoriteCharaRepo.save(favoriteChara);
				
		
		return true;
			
	}
	
	public boolean deleteFavorite(HttpServletRequest httpServletReq, long charaid) {
		
		boolean isFavorite = false;		
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		
		User user = userRepo.findById(userid).get();
		
		Chara chara = charaRepo.findById(charaid);
		
		if(!favoriteCharaRepo.existsByCharaAndUser(chara, user))		
			return false;
		
		favoriteCharaRepo.deleteByCharaAndUser(chara,user);
		
		
		return true;
		
	}
	
	
	@Override
	public boolean exsitsCharascore(HttpServletRequest httpServletReq, long charaid) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		Chara chara = charaRepo.findById(charaid);
		
		return charascoreRepo.existsByCharaAndUser(chara, user);
		
	}
	
	
	public ScoreResponse setScore(HttpServletRequest httpServletReq, long charaid, float score) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		Chara chara = charaRepo.findById(charaid);
		
		Charascore charascore = charascoreRepo.findByCharaAndUser(chara, user);		
		
		if(charascore != null) {
			charascore = Charascore.builder()		
					.id(charascore.getId())
					.chara(chara)
					.user(user)
					.score(score)
					.build();
		}
		else
			charascore = Charascore.builder()			
			.chara(chara)
			.user(user)
			.score(score)
			.build();		
		
		charascoreRepo.save(charascore);
		
		ScoreResponse response = new ScoreResponse();
		response.setId(charaid);
		response.setScore(score);
		response.setType("CHARA");
		response.setUserId(userid);
		
		return response;
	}
	
	public boolean deleteScore(HttpServletRequest httpServletReq, long charaid) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		Chara chara = charaRepo.findById(charaid);
		
		Charascore charascore = charascoreRepo.findByCharaAndUser(chara, user);
		
		if(charascore == null)
			return false;
			
		
		charascoreRepo.deleteByCharaAndUser(chara, user);
		

		
		return true;
	}


	
	public boolean existsReview(HttpServletRequest httpServletReq, long charaid) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Chara chara = charaRepo.findById(charaid);
		
		return charaReviewRepo.existsByUserAndChara(user, chara);
	}
	
	public boolean existsReview(long reviewid) {
		
		return charaReviewRepo.existsById(reviewid);		
		
	}
	
	
	public ReviewResponse getMyReview(HttpServletRequest httpServletReq, long charaid) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Chara chara = charaRepo.findById(charaid);
		
		CharaReview review = charaReviewRepo.findByUserAndChara(user, chara);
		
		ReviewResponse response = new ReviewResponse(review);
		response.setMine(true);
		response.setLoveCnt(review.getLoves().size());
		if(charaReviewLoveRepo.existsByUserAndReview(user, review))
			response.setLove(true);
		
		response.setUserAvatar(user.getAvatar());
		
		return response;
	}
	
	
	public ReviewResponse writeReview(HttpServletRequest httpServletReq, String content, long charaid) {
		
		ReviewResponse response = null;
		
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		Chara chara = charaRepo.findById(charaid);
		
		CharaReview review = CharaReview.builder()
				.content(content)
				.user(user)
				.chara(chara)
				.createdDate(LocalDateTime.now())
				.modifiedDate(LocalDateTime.now())
				.build();
		
		charaReviewRepo.save(review);
		
				

		response = new ReviewResponse(review);
		response.setMine(true);
		review = charaReviewRepo.findByUserAndChara(user, chara);
		response.setReviewId(review.getId());
		response.setUserAvatar(user.getAvatar());
		
		return response;
				
	}
	
	public ReviewResponse modifyReview(HttpServletRequest httpServletReq, ReviewRequest req, long charaid) {
		
		ReviewResponse response = null;
		
		CharaReview review = null;
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Chara chara = charaRepo.findById(charaid);
		
		if(!charaReviewRepo.existsByUserAndChara(user,chara)) 
			return null;
		
		review = charaReviewRepo.findByUserAndChara(user,chara);
		
		
		
		if(review.getUser() != user) 
			return null;
		
		
		
		review = CharaReview.builder()
				.id(review.getId())
				.content(req.getContent())
				.user(user)
				.chara(chara)
				.createdDate(review.getCreatedDate())
				.modifiedDate(LocalDateTime.now())
				.build();
		
		
		
		charaReviewRepo.save(review);
		
				
		
		response = new ReviewResponse(review);
		if(charaReviewLoveRepo.existsByUserAndReview(user, review))
			response.setLove(true);
		response.setMine(true);
		response.setUserAvatar(user.getAvatar());
		
		return response;
				
	}
	
	public boolean deleteReview(HttpServletRequest httpServletReq, long charaid) {
		
		ReviewResponse response = null;
		
		CharaReview review = null;
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Chara chara = charaRepo.findById(charaid);
		
		
		if(!charaReviewRepo.existsByUserAndChara(user,chara)) 
			return false;
		
		review = charaReviewRepo.findByUserAndChara(user,chara);
			
		
		charaReviewRepo.delete(review);
		
		return true;
				
	}
	
	public boolean exsitsReviewLove(HttpServletRequest httpServletReq, long reviewid) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		CharaReview review = charaReviewRepo.findById(reviewid);
		
		
		
		
		return charaReviewLoveRepo.existsByUserAndReview(user, review);
	}
	
	public void reviewLove(HttpServletRequest httpServletReq, long reviewid) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		CharaReview review = charaReviewRepo.findById(reviewid);
		
		CharaReviewLove reviewLove = CharaReviewLove.builder().user(user).review(review).build();
		
		charaReviewLoveRepo.save(reviewLove);
		
		
	}
	

	public boolean deleteReviewLove(HttpServletRequest httpServletReq, long reviewid) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		CharaReview review = charaReviewRepo.findById(reviewid);		
		
		charaReviewLoveRepo.deleteByUserAndReview(user,review);
		
		return true;
	}

	@Override
	public List<ReviewResponse> getReviews(HttpServletRequest httpServletReq, long charaid) {
		
		
		
		boolean isFavorite = false;		

		Chara chara = charaRepo.findById(charaid);		
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
				
		
		List<CharaReview> reviews = charaReviewRepo.findAllByChara(chara);
		
		List<ReviewResponse> reviewsRes = new ArrayList();
		for(CharaReview review : reviews) {
			ReviewResponse reviewRes = new ReviewResponse(review);
			
			if(review.getUser().getId() == userid)
				reviewRes.setMine(true);
			
			
			reviewRes.setLoveCnt(review.getLoves().size());
			if(user !=null && charaReviewLoveRepo.existsByUserAndReview(user, review))
				reviewRes.setLove(true);
			
			User reviewUser = review.getUser();
			reviewRes.setUserAvatar(reviewUser.getAvatar());			
			reviewRes.setLoveCnt(review.getLoves().size());
			reviewsRes.add(reviewRes);
		}		
		
		return reviewsRes;
	}



	
	
	
	
	
	
	
}
