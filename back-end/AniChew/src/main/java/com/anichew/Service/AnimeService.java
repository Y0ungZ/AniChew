package com.anichew.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.anichew.Request.ReviewRequest;
import com.anichew.Response.AnimeDetailResponse;
import com.anichew.Response.CharaResponse;
import com.anichew.Response.ReviewResponse;
import com.anichew.Response.ScoreResponse;

public interface AnimeService {
	ScoreResponse rateAnime(HttpServletRequest httpServletReq, long animeid, float score);
	
	boolean deleteRate(HttpServletRequest httpServletReq, long animeid);
	boolean existsAnimerate(HttpServletRequest httpServletReq, long animeid);
	boolean existsAnime(long animeid);
	AnimeDetailResponse animeDetail(HttpServletRequest httpServletReq, long animeid);
	ReviewResponse writeReview(HttpServletRequest httpServletReq, String content, long anime_id);
	ReviewResponse modifyReview(HttpServletRequest httpServletReq, ReviewRequest req, long anime_id);
	boolean deleteReview(HttpServletRequest httpServletReq, long anime_id);
	boolean existsReview(long reviewid);
	boolean existsReview(HttpServletRequest httpServletReq, long animeid);
	boolean exsitsReviewLove(HttpServletRequest httpServletReq, long reviewid);
	ReviewResponse getMyReview(HttpServletRequest httpServletReq, long animeid);
	void reviewLove(HttpServletRequest httpServletReq, long reviewid);
	boolean deleteReviewLove(HttpServletRequest httpServletReq, long reviewid);
	boolean setFavoriteAnime(HttpServletRequest httpServletReq, long animeid);
	boolean deleteFavoriteAnime(HttpServletRequest httpServletReq, long animeid);
	List<ReviewResponse> getReviews(HttpServletRequest httpServletReq, long animeid);
	List<CharaResponse> getCharas(long animeid);
	
}
