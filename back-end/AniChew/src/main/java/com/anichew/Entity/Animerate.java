package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name="animerate")
@Getter

public class Animerate {
	@Id
	@Column(name="animerate_id")
	long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="anime_id")
	Anime anime;
	
	
	@Column(name="animerate_score")
	float score;
		
	
	public Animerate() {}
	
	public Animerate(User user, Anime anime) {
		this.user = user;
		this.anime = anime;
	}
	
	public Animerate(User user, Anime anime, float score) {
		this.user = user;
		this.anime = anime;
		this.score = score;
	}	
	
	public void setScore(float score) {
		this.score = score;
	}
	
}
