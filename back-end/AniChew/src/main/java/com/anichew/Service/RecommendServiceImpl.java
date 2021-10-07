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
import com.anichew.Entity.RecommendStart;
import com.anichew.Repository.FavoriteAnimeRepository;
import com.anichew.Repository.RecommendStartRepository;
import com.anichew.Response.AnimeResponse;

@Service
public class RecommendServiceImpl implements RecommendService {
	
	
	@Autowired
	RecommendStartRepository recommendStartRepo;
	
	@Autowired
	FavoriteAnimeRepository favoriteAnimeRepo;
	
	
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
	public List<AnimeResponse> getFromBaseOfFavorite(HttpServletRequest httpServletReq) {
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
}
