package com.anichew.Entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.Getter;

@Entity
@Table(name="review_love")
@Getter
@DynamicInsert
public class ReviewLove {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="review_love_id")
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="review_id")
	private Review review;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	
	public ReviewLove() {}
	
	public ReviewLove(User user, Review review) {
		this.user = user;
		this.review = review;
	}
}
