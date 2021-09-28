package com.anichew.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.Entity.RecommendStart;
import com.anichew.Repository.RecommendStartRepository;
import com.anichew.Response.AnimeResponse;

@Service
public class RecommendServiceImpl implements RecommendService {
	
	
	@Autowired
	RecommendStartRepository recommendStartRepo;
	
	
	
	public List<AnimeResponse> recommnedStart(){
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
}
