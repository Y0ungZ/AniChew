package com.anichew.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.anichew.Response.AnimeResponse;

public interface RecommendService {
	List<AnimeResponse> getFromColdstart();
	List<AnimeResponse> getFromMasterpieces();
	List<AnimeResponse> getFromBaseOfUser(HttpServletRequest httpServletReq);
	List<AnimeResponse> getFromBaseOfFavorite(HttpServletRequest httpServletReq);
	List<AnimeResponse> getFromAnichew();
}
