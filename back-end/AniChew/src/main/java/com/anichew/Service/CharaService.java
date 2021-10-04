package com.anichew.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.anichew.Request.ReviewRequest;
import com.anichew.Response.CharaDetailResponse;
import com.anichew.Response.ReviewResponse;
import com.anichew.Response.ScoreResponse;

public interface CharaService {
	CharaDetailResponse charaDetail(HttpServletRequest httpServletReq, long charaid);
	boolean existsChara(long charaid);
	boolean setFavorite(HttpServletRequest httpServletReq, long charaid);
	boolean deleteFavorite(HttpServletRequest httpServletReq, long charaid);
	ScoreResponse setScore(HttpServletRequest httpServletReq, long charaid, float score);
	boolean deleteScore(HttpServletRequest httpServletReq, long charaid);
	boolean exsitsCharascore(HttpServletRequest httpServletReq, long charaid);
	ReviewResponse writeReview(HttpServletRequest httpServletReq, String content, long charaid);
	ReviewResponse modifyReview(HttpServletRequest httpServletReq, ReviewRequest req, long charaid);
	boolean deleteReview(HttpServletRequest httpServletReq, long reviewid, long charaid);
	boolean existsReview(long reviewid);
	boolean existsReview(HttpServletRequest httpServletReq, long charaid);
	boolean exsitsReviewLove(HttpServletRequest httpServletReq, long reviewid);
	ReviewResponse getMyReview(HttpServletRequest httpServletReq, long charaid);
	void reviewLove(HttpServletRequest httpServletReq, long reviewid);
	boolean deleteReviewLove(HttpServletRequest httpServletReq, long reviewid);
	List<ReviewResponse> getReviews(HttpServletRequest httpServletReq, long charaid);
	
}
