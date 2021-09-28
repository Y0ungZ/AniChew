package com.anichew.Service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeGenre;
import com.anichew.Entity.AnimeSeries;
import com.anichew.Entity.Animescore;
import com.anichew.Entity.User;
import com.anichew.Repository.AnimeGenreRepository;
import com.anichew.Repository.AnimeRepository;
import com.anichew.Repository.AnimeSeriesRepository;
import com.anichew.Repository.AnimescoreRepository;
import com.anichew.Repository.FavoriteAnimeRepository;
import com.anichew.Repository.UserRepository;
import com.anichew.Response.AnimeDetailResponse;
import com.anichew.Response.AnimeResponse;
import com.anichew.Response.AnimescoreResponse;
import com.anichew.Response.GenreResponse;
import com.anichew.Response.SeriesResponse;
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
	AnimeGenreRepository animeGenreRepo;
	
	@Autowired
	AnimeSeriesRepository animeSeriesRepo;
	
	@Autowired
	FavoriteAnimeRepository favoriteAnimeRepo;
	
	@Autowired
	AnimescoreRepository animescoreRepo;
	
	@Autowired
	JwtUtil jwtUtil;
	
	@Override
	public AnimescoreResponse rateAnime(HttpServletRequest httpServletReq, long animeid, float score) {
		
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
		
		AnimescoreResponse response = new AnimescoreResponse();
		response.setAnimeId(animeid);
		response.setUserId(Long.parseLong(userid));
		response.setScore(score);
		
		
		
		return response;
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
		boolean isFavorite = false;
		String accessor = null;
		if (requestTokenHeader != null) {
			accessor = jwtUtil.getUserid(requestTokenHeader);
		}		
	
		

		Anime anime = animeRepo.findById(animeid);
		AnimeDetailResponse response = new AnimeDetailResponse(anime);
		
		if(accessor!=null) {
			User user = userRepo.findById(Long.parseLong(accessor));
			
			isFavorite = favoriteAnimeRepo.existsByUserAndAnime(user, anime);
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
		List<AnimeSeries> seriesAnimes = animeSeriesRepo.findAllBySeries(seriesAnime.getSeries());
		
		SeriesResponse series = new SeriesResponse();
		series.setId(seriesAnime.getSeries().getId());
		series.setName(seriesAnime.getSeries().getName());
		
		
		for(AnimeSeries aSeries : seriesAnimes) {
			AnimeResponse relatedAnime = new AnimeResponse();
			relatedAnime.setId(aSeries.getAnime().getId());
			relatedAnime.setKoreanName(aSeries.getAnime().getKoreanName());
			relatedAnime.setName(aSeries.getAnime().getName());			
			relatedAnimes.add(relatedAnime);
		}
		
				
		float avgScore=0;
		
//		avgScore = animescoreRepo.avgByAnime((Long)anime.getId()); 
		
		long scores[] = new long[5];
		for(int i=1;i<=10;i++) {
			long cnt = animescoreRepo.countByAnimeAndScore(anime, i);
			scores[(i-1)/2] += cnt;
		}
		
		
		response.setGenres(genres);
		response.setSeries(series);
		response.setAvgScore(avgScore);
		response.setScores(scores);
		response.setRelatedAnimes(relatedAnimes);
		response.setFavorite(isFavorite);
//		response.setReviews(reviews);
		
		return response;
	}

}
