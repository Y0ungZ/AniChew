package com.anichew.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.Entity.AlarmSeries;
import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeChara;
import com.anichew.Entity.AnimeGenre;
import com.anichew.Entity.AnimePromotion;
import com.anichew.Entity.AnimeReview;
import com.anichew.Entity.AnimeReviewLove;
import com.anichew.Entity.AnimeSeries;
import com.anichew.Entity.Animescore;
import com.anichew.Entity.Chara;
import com.anichew.Entity.FavoriteAnime;
import com.anichew.Entity.RaitingPredictedraiting;
import com.anichew.Entity.Series;
import com.anichew.Entity.SimilarAnime;
import com.anichew.Entity.User;
import com.anichew.Repository.AlarmSeriesRepository;
import com.anichew.Repository.AnimeCharaRepository;
import com.anichew.Repository.AnimeGenreRepository;
import com.anichew.Repository.AnimePromotionRepository;
import com.anichew.Repository.AnimeRepository;
import com.anichew.Repository.AnimeReviewLoveRepository;
import com.anichew.Repository.AnimeReviewRepository;
import com.anichew.Repository.AnimeSeriesRepository;
import com.anichew.Repository.AnimescoreRepository;
import com.anichew.Repository.FavoriteAnimeRepository;
import com.anichew.Repository.RaitingPredictedraitingRepository;
import com.anichew.Repository.SeriesRepository;
import com.anichew.Repository.SimilarAnimeRepository;
import com.anichew.Repository.UserRepository;
import com.anichew.Request.ReviewRequest;
import com.anichew.Response.AnimeDetailResponse;
import com.anichew.Response.AnimeResponse;
import com.anichew.Response.CharaResponse;
import com.anichew.Response.GenreResponse;
import com.anichew.Response.ReviewResponse;
import com.anichew.Response.ScoreResponse;
import com.anichew.Response.SeriesResponse;
import com.anichew.Util.CookieUtil;
import com.anichew.Util.JwtUtil;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly=true)
public class AnimeServiceImpl implements AnimeService {


	private final UserRepository userRepo;
	private final AnimeRepository animeRepo;
	private final AnimescoreRepository animerateRepo;
	private final AnimeGenreRepository animeGenreRepo;
	private final AnimeSeriesRepository animeSeriesRepo;
	private final AnimeCharaRepository animeCharaRepo;
	private final FavoriteAnimeRepository favoriteAnimeRepo;
	private final AnimescoreRepository animescoreRepo;
	private final AnimeReviewRepository animeReviewRepo;
	private final AnimeReviewLoveRepository animeReviewLoveRepo;
	private final AnimePromotionRepository animePromotionRepo;
	private final SeriesRepository seriesRepo;
	private final SimilarAnimeRepository similarAnimeRepo;
	private final AlarmSeriesRepository alarmSeriesRepo;
	private final RaitingPredictedraitingRepository raitingPredictedRepo;
	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;
	
	
	
	@Override
	public ScoreResponse rateAnime(HttpServletRequest httpServletReq, long animeid, float score) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		Anime anime = animeRepo.findById(animeid);
		
		Animescore animerate;
		
		if(animerateRepo.existsByUserAndAnime(user, anime)) {
			animerate = animerateRepo.findByUserAndAnime(user,anime);			
		}else {
			animerate = new Animescore(user, anime);
		}
		
		animerate.setScore(score);
		
		animerateRepo.save(animerate);
		
		ScoreResponse response = new ScoreResponse();
		response.setId(animeid);
		response.setUserId(userid);
		response.setType("ANIME");
		response.setScore(score);
		
		
		
		return response;
	}


	@Override
	public boolean deleteRate(HttpServletRequest httpServletReq, long animeid) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Anime anime = animeRepo.findById(animeid);
		
		animerateRepo.deleteByUserAndAnime(user, anime);
		
		
				
		return true;
	}

	@Override
	public boolean existsAnimerate(HttpServletRequest httpServletReq, long animeid) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		Anime anime = animeRepo.findById(animeid);
				
		if(animerateRepo.existsByUserAndAnime(user, anime))
			return true;
		
		return false;
	}

	@Override
	public boolean existsAnime(long animeid) {
		
		if(animeRepo.existsById(animeid))
			return true;
		
		return false;
	}


	@Override
	public AnimeDetailResponse animeDetail(HttpServletRequest httpServletReq, long animeid) {
		
		
		boolean isFavorite = false;
		boolean alarm = false;
		float predictedScore = 0;
		

		Anime anime = animeRepo.findById(animeid);
		AnimeDetailResponse response = new AnimeDetailResponse(anime);
		
		
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		
		
		if(user!=null) {			
			isFavorite = favoriteAnimeRepo.existsByUserAndAnime(user, anime);
			
			RaitingPredictedraiting predicted = raitingPredictedRepo.findByUserAndAnime(user, anime);
			
			if(predicted != null)
				predictedScore = predicted.getAdustedPredictedScore();
			
		}
		
		
		
		List<AnimeGenre> animeGenres = animeGenreRepo.findAllByAnime(anime);
		
		List<GenreResponse> genres = new ArrayList();
		
		for(AnimeGenre aGenre : animeGenres) {
			GenreResponse genre = new GenreResponse();
			genre.setId(aGenre.getGenre().getId());
			genre.setName(aGenre.getGenre().getName());
			
			genres.add(genre);			
		}		
		
		List<AnimeResponse> relatedAnimes = new ArrayList();
		
		AnimeSeries seriesAnime = animeSeriesRepo.findByAnime(anime);
		List<AnimeSeries> seriesAnimes = null; 
		SeriesResponse series = new SeriesResponse();
		
		if(seriesAnime != null) {
			seriesAnimes = animeSeriesRepo.findAllBySeries(seriesAnime.getSeries());
			series.setId(seriesAnime.getSeries().getId());
			series.setName(seriesAnime.getSeries().getName());
			if(alarmSeriesRepo.findByUserAndSeries(user, seriesAnime.getSeries())!=null) {
				alarm = true;
			}
			
			
			
			for(AnimeSeries aSeries : seriesAnimes) {
				AnimeResponse relatedAnime = new AnimeResponse();
				relatedAnime.setId(aSeries.getAnime().getId());
				relatedAnime.setKoreanName(aSeries.getAnime().getKoreanName());
				relatedAnime.setName(aSeries.getAnime().getName());			
				relatedAnimes.add(relatedAnime);
			}
			
		}
		
	
				
		float avgScore=0;
		float sum=0;
		int cntSum = 0; 
		
		long scores[] = new long[5];
		for(int i=1;i<=10;i++) {
			long cnt = animescoreRepo.countByAnimeAndScore(anime, i);
			scores[(i-1)/2] += cnt;
			cntSum += cnt;
			sum += i * cnt;
		}			
		
		float myScore = 0;
		
		if(user!=null && animescoreRepo.existsByUserAndAnime(user, anime)) {
			myScore = animescoreRepo.findByUserAndAnime(user, anime).getScore();
		}
		
		if(cntSum != 0)
			avgScore = sum / cntSum;   
		
		
		
		List<SimilarAnime> similars = similarAnimeRepo.findAllByAnime(anime);
		List<AnimeResponse> similarAnimes = new ArrayList();
		
		for(SimilarAnime similarAnime : similars) {
			
			Anime similar = animeRepo.findById(similarAnime.getSimilarAnimeId());
			if(similar == null) continue;
			
			AnimeResponse animeRes = new AnimeResponse();
			animeRes.setId(similar.getId());
			animeRes.setKoreanName(similar.getKoreanName());
			animeRes.setName(similar.getName());
			
			similarAnimes.add(animeRes);
			
		}
		
		
		
		
		
		response.setGenres(genres);
		response.setSeries(series);
		response.setAvgScore(avgScore);
		response.setScores(scores);
		response.setRelatedAnimes(relatedAnimes);
		response.setFavorite(isFavorite);
		response.setMyScore(myScore);
		response.setAlarm(alarm);
		response.setPredictedScore(predictedScore);
		response.setSimilarAnimes(similarAnimes);
		
		return response;
	}
	
	
	public boolean existsReview(HttpServletRequest httpServletReq, long animeid) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Anime anime = animeRepo.findById(animeid);
		
		return animeReviewRepo.existsByUserAndAnime(user, anime);
	}
	
	public boolean existsReview(long reviewid) {
		
		return animeReviewRepo.existsById(reviewid);		
		
	}
	
	
	public ReviewResponse getMyReview(HttpServletRequest httpServletReq, long animeid) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Anime anime = animeRepo.findById(animeid);
		
		AnimeReview review = animeReviewRepo.findByUserAndAnime(user, anime);
		
		ReviewResponse response = new ReviewResponse(review);
		response.setMine(true);
		response.setLoveCnt(review.getLoves().size());		
		response.setUserAvatar(user.getAvatar());
		if(animeReviewLoveRepo.existsByUserAndReview(user, review))
			response.setLove(true);
		
		return response;
	}
	
	
	public ReviewResponse writeReview(HttpServletRequest httpServletReq, String content, long animeid) {
		
		ReviewResponse response = null;
		
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		Anime anime = animeRepo.findById(animeid);
		
		AnimeReview review = AnimeReview.builder()
				.content(content)
				.user(user)
				.anime(anime)
				.createdDate(LocalDateTime.now())
				.modifiedDate(LocalDateTime.now())
				.build();
		
		animeReviewRepo.save(review);
		
				

		response = new ReviewResponse(review);
		response.setMine(true);
		
		review = animeReviewRepo.findByUserAndAnime(user, anime);
		response.setReviewId(review.getId());
		response.setUserAvatar(user.getAvatar());
		return response;
				
	}
	
	public ReviewResponse modifyReview(HttpServletRequest httpServletReq, ReviewRequest req, long anime_id) {
		
		ReviewResponse response = null;
		
		AnimeReview review = null;
		
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Anime anime = animeRepo.findById(anime_id);
		
		if(!animeReviewRepo.existsByUserAndAnime(user, anime)) 
			return null;
		
		review = animeReviewRepo.findByUserAndAnime(user, anime);
		
		if(review.getUser() != user) 
			return null;
		
		
		
		review = AnimeReview.builder()
				.id(review.getId())
				.content(req.getContent())
				.user(user)
				.anime(anime)
				.createdDate(review.getCreatedDate())
				.modifiedDate(LocalDateTime.now())
				.build();
		
		
		
		animeReviewRepo.save(review);
		
				
		
		response = new ReviewResponse(review);
		if(animeReviewLoveRepo.existsByUserAndReview(user, review))
			response.setLove(true);
		response.setMine(true);
		response.setUserAvatar(user.getAvatar());
		
		return response;
				
	}
	
	public boolean deleteReview(HttpServletRequest httpServletReq, long anime_id) {
		
		ReviewResponse response = null;
		
		AnimeReview review = null;
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		Anime anime = animeRepo.findById(anime_id);
		
		if(!animeReviewRepo.existsByUserAndAnime(user, anime)) 
			return false;
		
		review = animeReviewRepo.findByUserAndAnime(user, anime);
		
		if(review.getUser() != user) 
			return false;
		
		
		
		if(review.getUser() != user) 
			return false;
		
		
		animeReviewRepo.delete(review);
		
				
		
		
		return true;
				
	}
	
	public boolean exsitsReviewLove(HttpServletRequest httpServletReq, long reviewid) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		AnimeReview review = animeReviewRepo.findById(reviewid);
		
		
		
		
		return animeReviewLoveRepo.existsByUserAndReview(user, review);
	}
	
	public void reviewLove(HttpServletRequest httpServletReq, long reviewid) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		AnimeReview review = animeReviewRepo.findById(reviewid);
		
		AnimeReviewLove reviewLove = AnimeReviewLove.builder().user(user).review(review).build();
		
		animeReviewLoveRepo.save(reviewLove);
		
		
	}
	

	public boolean deleteReviewLove(HttpServletRequest httpServletReq, long reviewid) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		AnimeReview review = animeReviewRepo.findById(reviewid);		
		
		animeReviewLoveRepo.deleteByUserAndReview(user,review);
		
		return true;
	}


	public boolean setFavoriteAnime(HttpServletRequest httpServletReq, long animeid) {		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		Anime anime = animeRepo.findById(animeid);
		
		if(favoriteAnimeRepo.existsByUserAndAnime(user, anime))
			return false;
		
		
		FavoriteAnime favoriteAnime = new FavoriteAnime(user,anime);
		favoriteAnimeRepo.save(favoriteAnime);
		
		
		
		return true;
	}
	
	public boolean deleteFavoriteAnime(HttpServletRequest httpServletReq, long animeid) {		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();

		Anime anime = animeRepo.findById(animeid);
		
		if(!favoriteAnimeRepo.existsByUserAndAnime(user, anime))
			return false;
		
		
		
		favoriteAnimeRepo.deleteByUserAndAnime(user,anime);
		
		
		
		return true;
	}


	@Override
	public List<ReviewResponse> getReviews(HttpServletRequest httpServletReq, long animeid) {
		
		
		boolean isFavorite = false;
		
		
		

		Anime anime = animeRepo.findById(animeid);
		AnimeDetailResponse response = new AnimeDetailResponse(anime);
		
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
						
		
		List<AnimeReview> reviews = animeReviewRepo.findAllByAnime(anime);		
		
		List<ReviewResponse> reviewsRes = new ArrayList();
		for(AnimeReview review : reviews) {
			ReviewResponse reviewRes = new ReviewResponse(review);
			
			if(review.getUser().getId() == userid)
				reviewRes.setMine(true);
			
			
			reviewRes.setLoveCnt(review.getLoves().size());
			if(user !=null && animeReviewLoveRepo.existsByUserAndReview(user, review))
				reviewRes.setLove(true);
			
			User reviewUser = review.getUser();
			reviewRes.setUserAvatar(reviewUser.getAvatar());
			reviewRes.setLoveCnt(review.getLoves().size());
			reviewsRes.add(reviewRes);
		}
		
		
		
		
		
		return reviewsRes;
	}


	public List<CharaResponse> getCharas(long animeid){
		
		
		Anime anime = animeRepo.findById(animeid);
		
		List<AnimeChara> animeCharas = animeCharaRepo.findAllByAnime(anime);
		List<CharaResponse> response = new ArrayList();
		
		for(AnimeChara animeChara : animeCharas) {
			Chara chara = animeChara.getChara();
			CharaResponse charaRes = new CharaResponse();
			charaRes.setId(chara.getId());
			charaRes.setFirstName(chara.getFirstName());
			charaRes.setLastName(chara.getLastName());
			
			
			
			response.add(charaRes);			
			
		}
		
		
		return response;
	}
	

	public List<AnimeDetailResponse> getPromotion(HttpServletRequest httpServletReq){
		
		List<AnimePromotion> promotions = animePromotionRepo.findAll();
		
		List<AnimeDetailResponse> response = new ArrayList();
		
		for(AnimePromotion promotion : promotions) {
			response.add(animeDetail(httpServletReq,promotion.getAnimeId()));
		}
		
		
		return response;
	}
	
	
	public SeriesResponse setAlarm (HttpServletRequest httpServletReq, long animeid) {
		
		
		Anime anime = animeRepo.findById(animeid);
		AnimeSeries animeSeries = animeSeriesRepo.findByAnime(anime);
		Series series = animeSeries.getSeries();
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		if(alarmSeriesRepo.findByUserAndSeries(user, series)==null) {
			AlarmSeries alarmSeries = AlarmSeries.builder().user(user).series(series).build();
			
			alarmSeriesRepo.save(alarmSeries);
		}
		
		SeriesResponse response = new SeriesResponse();
		response.setId(series.getId());
		response.setName(series.getName());
		
		return response;
	}
	
	public boolean deleteAlarm(HttpServletRequest httpServletReq, long animeid) {
		Anime anime = animeRepo.findById(animeid);
		AnimeSeries animeSeries = animeSeriesRepo.findByAnime(anime);
		Series series = animeSeries.getSeries();
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid).get();
		
		AlarmSeries alarmSeries = alarmSeriesRepo.findByUserAndSeries(user, series);
		
		if(alarmSeries==null) {
			return false;
		}
		
		
		alarmSeriesRepo.delete(alarmSeries);
	
		
		return true;
		
	}
	
	

}
