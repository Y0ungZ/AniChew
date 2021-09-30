package com.anichew.Response;

import java.time.LocalDateTime;

import com.anichew.Entity.Review;

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
	
	public ReviewResponse(){}
	
	public ReviewResponse(Review review){
		this.animeId = review.getId();
		this.userId = review.getUser().getId();
		this.animeId = review.getAnime().getId();
		this.nickname = review.getUser().getNickname();
		this.name = review.getAnime().getKoreanName();
		this.content = review.getContent();
		this.createdDate = review.getCreatedDate();
		this.modifiedDate = review.getModifiedDate();		
	}
	
}
