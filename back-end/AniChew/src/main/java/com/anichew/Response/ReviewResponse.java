package com.anichew.Response;

import java.time.LocalDateTime;

import com.anichew.Entity.AnimeReview;
import com.anichew.Entity.CharaReview;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponse {
	private long reviewId;
	private long userId;
	private long targetId;
	private String userAvatar;
	private String nickname;
	private String name;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private int loveCnt;
	private boolean isLove;
	private boolean isMine;
	private String type;
	
	public ReviewResponse(){}
	
	public ReviewResponse(AnimeReview review){
		this.reviewId = review.getId();
		this.userId = review.getUser().getId();
		this.targetId = review.getAnime().getId();
		this.nickname = review.getUser().getNickname();
		this.name = review.getAnime().getKoreanName();
		this.content = review.getContent();
		this.createdDate = review.getCreatedDate();
		this.modifiedDate = review.getModifiedDate();
		this.type = "Animation";
	}	
	
	public ReviewResponse(CharaReview review){
		this.reviewId = review.getId();
		this.userId = review.getUser().getId();
		this.targetId = review.getChara().getId();
		this.nickname = review.getUser().getNickname();
		this.name = review.getChara().getLastName()+ " "+review.getChara().getFirstName();
		this.content = review.getContent();
		this.createdDate = review.getCreatedDate();
		this.modifiedDate = review.getModifiedDate();
		this.type = "Character";
	}
	
}
