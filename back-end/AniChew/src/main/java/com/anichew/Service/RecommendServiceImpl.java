package com.anichew.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.Entity.Anime;
import com.anichew.Entity.Animescore;
import com.anichew.Entity.FavoriteAnime;
import com.anichew.Entity.RaitingPredictedraiting;
import com.anichew.Entity.RecommendStart;
import com.anichew.Entity.SimilarAnime;
import com.anichew.Entity.User;
import com.anichew.Repository.AnimescoreRepository;
import com.anichew.Repository.FavoriteAnimeRepository;
import com.anichew.Repository.RaitingPredictedraitingRepository;
import com.anichew.Repository.RecommendStartRepository;
import com.anichew.Repository.SimilarAnimeRepository;
import com.anichew.Repository.UserRepository;
import com.anichew.Response.AnimeResponse;
import com.anichew.Util.CookieUtil;
import com.anichew.Util.JwtUtil;

@Service
public class RecommendServiceImpl implements RecommendService {
	
	
	@Autowired
	RecommendStartRepository recommendStartRepo;
	
	@Autowired
	FavoriteAnimeRepository favoriteAnimeRepo;
	
	@Autowired
	AnimescoreRepository animescoreRepo;
	
	@Autowired
	SimilarAnimeRepository similarAnimeRepo;
	
	@Autowired
	RaitingPredictedraitingRepository raitingPredictedRepo;
	
	@Autowired
	UserRepository userRepo;
	
	
	@Autowired
	JwtUtil jwtUtil;
	
	@Autowired
	CookieUtil cookieUtil;
	
	
	@Override
	public List<AnimeResponse> getFromColdstart(){
		List<AnimeResponse> response = new ArrayList();
		
		
		List<RecommendStart> recommends = recommendStartRepo.findAll();
		for(RecommendStart rec : recommends) {
			AnimeResponse animeRes = new AnimeResponse();
			animeRes.setId(rec.getAnime().getId());
			animeRes.setKoreanName(rec.getAnime().getKoreanName());
			animeRes.setName(rec.getAnime().getName());
			response.add(animeRes);
		}
		
		
		
		return response;
		
		
	}

	@Override
	public List<AnimeResponse> getFromMasterpieces() {
		
		List<RecommendStart> recommends = recommendStartRepo.findAll();
		Set<RecommendStart> set = new HashSet();
		
		List<AnimeResponse> response = new ArrayList();
		
		Random random = new Random();
		
		while(set.size() < 10) {
			int idx = random.nextInt(305);
			RecommendStart recommend = recommends.get(idx);
			
			
			if(!set.contains(recommend)) {
				set.add(recommend);
				AnimeResponse animeRes = new AnimeResponse();
				Anime anime = recommend.getAnime();
				animeRes.setId(anime.getId());
				animeRes.setKoreanName(anime.getKoreanName());
				animeRes.setName(anime.getName());
				response.add(animeRes);
			}
			
		}
		
		
		return response;
	}

	@Override
	public List<AnimeResponse> getFromBaseOfUser(HttpServletRequest httpServletReq) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid);	
		float score = 8;
		List<RaitingPredictedraiting> predictedRaitings = raitingPredictedRepo.findByUserAndAdustedPredictedScoreGreaterThanOrderByAdustedPredictedScore(user, score);
		List<Animescore> myWatched = animescoreRepo.findAllByUser(user);
		
		Set<Anime> myWatchedSet = new HashSet();
		Set<Anime> similarSet = new HashSet();
		Set<Anime> recommendSet = new HashSet();
		
				
		for(Animescore animescore : myWatched) {
			Anime anime = animescore.getAnime();
			myWatchedSet.add(anime);
		}
		
		List<AnimeResponse> response = new ArrayList();
		Random random = new Random();
		
		while(recommendSet.size()<10 || recommendSet.size() < predictedRaitings.size()) {
			int idx = random.nextInt(predictedRaitings.size());
			Anime anime = predictedRaitings.get(idx).getAnime();
			if(!recommendSet.contains(anime)) {
				recommendSet.add(anime);
				AnimeResponse animeRes = new AnimeResponse();
				animeRes.setId(anime.getId());
				animeRes.setKoreanName(anime.getKoreanName());
				animeRes.setName(anime.getName());
				response.add(animeRes);
			}
		}
		
				
		return response;
	}

	@Override
	public List<AnimeResponse> getFromBaseOfFavorite(HttpServletRequest httpServletReq) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid);	
		
		List<FavoriteAnime> favoriteAnimes = user.getFavoriteAnimes();
		List<Animescore> myWatched = animescoreRepo.findAllByUser(user);
		
		Set<Anime> myWatchedSet = new HashSet();
		Set<Anime> similarSet = new HashSet();
		Set<Anime> recommendSet = new HashSet();
		
		for(Animescore animescore : myWatched) {
			Anime anime = animescore.getAnime();
			myWatchedSet.add(anime);
		}
		
		
		for(FavoriteAnime favoriteAnime : favoriteAnimes) {
			Anime anime = favoriteAnime.getAnime();
			List<SimilarAnime> similars = similarAnimeRepo.findAllByAnime(anime);
			for(SimilarAnime similarAnime : similars) {
				if(!myWatchedSet.contains(similarAnime.getAnime())) {
					similarSet.add(similarAnime.getAnime());
				}
			}
		}
		
		List<AnimeResponse> response = new ArrayList();
		List<Anime> animes = new ArrayList(similarSet);
		Random random = new Random();
		
		while(recommendSet.size()<10 || recommendSet.size() < animes.size()) {
			int idx = random.nextInt(animes.size());
			Anime anime = animes.get(idx);
			if(!recommendSet.contains(anime)) {
				recommendSet.add(anime);
				AnimeResponse animeRes = new AnimeResponse();
				animeRes.setId(anime.getId());
				animeRes.setKoreanName(anime.getKoreanName());
				animeRes.setName(anime.getName());
				response.add(animeRes);
			}
		}
		
				
		return response;
	}
}
