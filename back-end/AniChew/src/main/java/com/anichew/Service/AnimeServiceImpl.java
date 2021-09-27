package com.anichew.Service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.Entity.Anime;
import com.anichew.Entity.Animescore;
import com.anichew.Entity.User;
import com.anichew.Repository.AnimeRepository;
import com.anichew.Repository.AnimescoreRepository;
import com.anichew.Repository.UserRepository;
import com.anichew.Response.AnimeDetailResponse;
import com.anichew.Util.JwtUtil;

@Service
public class AnimeServiceImpl implements AnimeService {

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	AnimeRepository animeRepo;
	
	@Autowired
	AnimescoreRepository animerateRepo;
	
	@Autowired
	JwtUtil jwtUtil;
	
	@Override
	public boolean rateAnime(HttpServletRequest httpServletReq, long animeid, float score) {
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userid = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(userid));		
		
		Anime anime = animeRepo.findById(animeid);
		
		Animescore animerate;
		
		if(animerateRepo.existsByUserAndAnime(user, anime)) {
			animerate = animerateRepo.findByUserAndAnime(user,anime);			
		}else {
			animerate = new Animescore(user, anime);
		}
		
		animerate.setScore(score);
		
		animerateRepo.save(animerate);
		
		
		
		
		return false;
	}


	@Override
	public boolean deleteRate(HttpServletRequest httpServletReq, long animeid) {
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userid = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(userid));		
		Anime anime = animeRepo.findById(animeid);
		
		animerateRepo.deleteByUserAndAnime(user, anime);
		
		
				
		return true;
	}

	@Override
	public boolean existsAnimerate(HttpServletRequest httpServletReq, long animeid) {
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userid = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(userid));		
		
		Anime anime = animeRepo.findById(animeid);
				
		if(animerateRepo.existsByUserAndAnime(user, anime))
			return true;
		
		return false;
	}

	@Override
	public boolean exsitsAnime(HttpServletRequest httpServletReq, long animeid) {
		
		if(animeRepo.existsById(animeid))
			return true;
		
		return false;
	}


	@Override
	public AnimeDetailResponse animeDetail(HttpServletRequest httpServletReq, long animeid) {
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		
		String accessor = null;
		if (requestTokenHeader != null) {
			accessor = jwtUtil.getUserid(requestTokenHeader);
		}
		
		
		
		Anime anime = animeRepo.findById(animeid);
		AnimeDetailResponse response = new AnimeDetailResponse(anime);
		
		

		
		
		
		return null;
	}

}
