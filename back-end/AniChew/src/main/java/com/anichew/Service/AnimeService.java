package com.anichew.Service;

import javax.servlet.http.HttpServletRequest;

import com.anichew.Response.AnimeDetailResponse;
import com.anichew.Response.AnimescoreResponse;

public interface AnimeService {
	AnimescoreResponse rateAnime(HttpServletRequest httpServletReq, long animeid, float score);
	boolean deleteRate(HttpServletRequest httpServletReq, long animeid);
	boolean existsAnimerate(HttpServletRequest httpServletReq, long animeid);
	boolean exsitsAnime(HttpServletRequest httpServletReq, long animeid);
	AnimeDetailResponse animeDetail(HttpServletRequest httpServletReq, long animeid);
}
