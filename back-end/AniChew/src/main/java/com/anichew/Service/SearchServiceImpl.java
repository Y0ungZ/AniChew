package com.anichew.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.Entity.Anime;
import com.anichew.Entity.Chara;
import com.anichew.Entity.User;
import com.anichew.Repository.AnimeRepository;
import com.anichew.Repository.CharaRepository;
import com.anichew.Repository.UserRepository;
import com.anichew.Response.SearchResponse;


@Service
public class SearchServiceImpl implements SearchService {
	
	
	@Autowired
	private AnimeRepository animeRepo;
	
	@Autowired
	private CharaRepository charaRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	
	public List<SearchResponse> getAnimeList(String keyword){
		
		List<SearchResponse> response = new ArrayList();
		
		
		List<Anime> animes = animeRepo.findAllByKoreanNameContaining(keyword);
		
		for(Anime anime : animes) {
			
			SearchResponse search = new SearchResponse();
			search.setType("Animation");
			search.setId(anime.getId());
			search.setName(anime.getKoreanName());
			search.setImage(Long.toString(anime.getId()));
			response.add(search);
		}
		
		return response;
		
	}

	@Override
	public List<SearchResponse> getCharaList(String keyword) {
		
		List<SearchResponse> response = new ArrayList();
		
		
		List<Chara> charas = charaRepo.findAllByFirstNameContainingOrLastNameContaining(keyword, keyword);
		
		for(Chara chara : charas) {
			
			SearchResponse search = new SearchResponse();
			search.setType("Character");
			search.setId(chara.getId());
			search.setName(chara.getLastName()+" "+chara.getFirstName());
			search.setImage(Long.toString(chara.getId()));
			response.add(search);
		}
		
		return response;
		
	}

	@Override
	public List<SearchResponse> getUserList(String keyword) {
		
		List<SearchResponse> response = new ArrayList();
		
		List<User> users = userRepo.findAllByNicknameContains(keyword);
		
		for(User user : users) {			
			SearchResponse search = new SearchResponse();
			search.setType("User");
			search.setId(user.getId());
			search.setName(user.getNickname());
			search.setImage(user.getAvatar());
			response.add(search);
			
		}
		
		
		
		return response;
	}
	
}
