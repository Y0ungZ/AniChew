package com.anichew.Service;

import javax.servlet.http.HttpServletRequest;

import com.anichew.Response.CharaDetailResponse;

public interface CharaService {
	CharaDetailResponse charaDetail(HttpServletRequest httpServletReq, long charaid);
	boolean existsChara(long charaid);
	boolean setFavorite(HttpServletRequest httpServletReq, long charaid);
	boolean deleteFavorite(HttpServletRequest httpServletReq, long charaid);
	boolean setScore(HttpServletRequest httpServletReq, long charaid, float score);
	boolean deleteScore(HttpServletRequest httpServletReq, long charaid, float score);
	
}
