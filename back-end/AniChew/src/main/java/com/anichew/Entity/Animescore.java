package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;

@Entity
@Table(name="animescore")
@Getter
@DynamicInsert
public class Animescore {
	@Id
	@Column(name="animescore_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="anime_id")
	Anime anime;
	
	
	@Column(name="animescore_score")
	float score;
		
	
	public Animescore() {}
	
	public Animescore(User user, Anime anime) {
		this.user = user;
		this.anime = anime;
	}
	
	public Animescore(User user, Anime anime, float score) {
		this.user = user;
		this.anime = anime;
		this.score = score;
	}	
	
	public void setScore(float score) {
		this.score = score;
	}
	
}
