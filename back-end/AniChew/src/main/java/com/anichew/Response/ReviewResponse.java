package com.anichew.Response;

import java.time.LocalDateTime;

import com.anichew.Entity.AnimeReview;
import com.anichew.Entity.CharaReview;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponse {
	private long id;
	private long userId;
	private long animeId;
	private String nickname;
	private String name;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private int loveCnt;
	private boolean isLove;
	private boolean isMine;
	
	public ReviewResponse(){}
	
	public ReviewResponse(AnimeReview review){
		this.animeId = review.getId();
		this.userId = review.getUser().getId();
		this.animeId = review.getAnime().getId();
		this.nickname = review.getUser().getNickname();
		this.name = review.getAnime().getKoreanName();
		this.content = review.getContent();
		this.createdDate = review.getCreatedDate();
		this.modifiedDate = review.getModifiedDate();		
	}	
	
	public ReviewResponse(CharaReview review){
		this.animeId = review.getId();
		this.userId = review.getUser().getId();
		this.animeId = review.getChara().getId();
		this.nickname = review.getUser().getNickname();
		this.name = review.getChara().getLastName()+ " "+review.getChara().getFirstName();
		this.content = review.getContent();
		this.createdDate = review.getCreatedDate();
		this.modifiedDate = review.getModifiedDate();		
	}
	
}
