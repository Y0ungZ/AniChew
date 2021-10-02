package com.anichew.Service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeChara;
import com.anichew.Entity.AnimeSeries;
import com.anichew.Entity.Chara;
import com.anichew.Entity.Charascore;
import com.anichew.Entity.FavoriteChara;
import com.anichew.Entity.User;
import com.anichew.Repository.AnimeCharaRepository;
import com.anichew.Repository.AnimeSeriesRepository;
import com.anichew.Repository.CharaRepository;
import com.anichew.Repository.CharascoreRepository;
import com.anichew.Repository.FavoriteCharaRepository;
import com.anichew.Repository.SeriesRepository;
import com.anichew.Repository.UserRepository;
import com.anichew.Response.AnimeResponse;
import com.anichew.Response.CharaDetailResponse;
import com.anichew.Response.ScoreResponse;
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
	private JwtUtil jwtUtil;
	
	public CharaDetailResponse charaDetail(HttpServletRequest httpServletReq, long charaid) {		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		boolean isFavorite = false;
		String accessor = null;
		if (requestTokenHeader != null) {
			accessor = jwtUtil.getUserid(requestTokenHeader);
		}		
		
		User user = null;
		if(accessor != null) {
			user = userRepo.findById(Long.parseLong(accessor));
		}
		
		Chara chara = charaRepo.findById(charaid);
		
		System.out.println(chara.getId());
		System.out.println(chara.getSeiyu().getId());
		
		CharaDetailResponse response = new CharaDetailResponse(chara);
		
		
		List<AnimeChara> charaAnimes = animeCharaRepo.findAllByChara(chara);
		List<AnimeResponse> animes = new ArrayList();
		
		String series = null;
		
		for(AnimeChara charaAnime : charaAnimes) {
			System.out.println("하이");
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
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		boolean isFavorite = false;		
		String userid = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(userid));
		
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
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		boolean isFavorite = false;		
		String userid = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(userid));
		
		Chara chara = charaRepo.findById(charaid);
		
		if(favoriteCharaRepo.existsByCharaAndUser(chara, user))		
			return false;
		
		favoriteCharaRepo.deleteByCharaAndUser(chara,user);
		
		
		return true;
		
	}
	
	
	@Override
	public boolean exsitsCharascore(HttpServletRequest httpServletReq, long charaid) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userid = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(userid));
		
		Chara chara = charaRepo.findById(charaid);
		
		return charascoreRepo.existsByCharaAndUser(chara, user);
		
	}
	
	
	public ScoreResponse setScore(HttpServletRequest httpServletReq, long charaid, float score) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userid = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(userid));
		
		Chara chara = charaRepo.findById(charaid);
		
		Charascore charascore = charascoreRepo.findByCharaAndUser(chara, user);
		
		if(charascore != null) {
			charascore = Charascore.builder()		
					.id(charascore.getId())
					.chara(chara)
					.user(user)
					.build();
		}
		else
			charascore = Charascore.builder()			
			.chara(chara)
			.user(user)
			.build();		
		
		charascoreRepo.save(charascore);
		
		ScoreResponse response = new ScoreResponse();
		response.setId(charaid);
		response.setScore(score);
		response.setType("CHARA");
		response.setUserId(Long.parseLong(userid));
		
		return response;
	}
	
	public boolean deleteScore(HttpServletRequest httpServletReq, long charaid) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userid = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(userid));
		
		Chara chara = charaRepo.findById(charaid);
		
		Charascore charascore = charascoreRepo.findByCharaAndUser(chara, user);
		
		if(charascore == null)
			return false;
			
		
		charascoreRepo.deleteByCharaAndUser(chara, user);
		

		
		return true;
	}


	
	
	
	
}
