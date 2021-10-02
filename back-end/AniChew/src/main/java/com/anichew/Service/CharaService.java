package com.anichew.Service;

import javax.servlet.http.HttpServletRequest;

import com.anichew.Response.CharaDetailResponse;
import com.anichew.Response.ScoreResponse;

public interface CharaService {
	CharaDetailResponse charaDetail(HttpServletRequest httpServletReq, long charaid);
	boolean existsChara(long charaid);
	boolean setFavorite(HttpServletRequest httpServletReq, long charaid);
	boolean deleteFavorite(HttpServletRequest httpServletReq, long charaid);
	ScoreResponse setScore(HttpServletRequest httpServletReq, long charaid, float score);
	boolean deleteScore(HttpServletRequest httpServletReq, long charaid);
	boolean exsitsCharascore(HttpServletRequest httpServletReq, long charaid);
	
}
