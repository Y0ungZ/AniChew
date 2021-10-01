package com.anichew.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.Entity.Anime;
import com.anichew.Repository.AnimeRepository;
import com.anichew.Response.SearchResponse;


@Service
public class SearchServiceImpl implements SearchService {
	
	
	@Autowired
	AnimeRepository animeRepo;
	
	public List<SearchResponse> getAnimeList(String keyword){
		
		List<SearchResponse> response = new ArrayList();
		
		
		List<Anime> animes = animeRepo.findAllByKoreanNameContaining(keyword);
		
		for(Anime anime : animes) {
			
			SearchResponse search = new SearchResponse();
			search.setType("ANIME");
			search.setId(anime.getId());
			search.setName(anime.getKoreanName());
			response.add(search);
		}
		
		return response;
		
	}
	
}
