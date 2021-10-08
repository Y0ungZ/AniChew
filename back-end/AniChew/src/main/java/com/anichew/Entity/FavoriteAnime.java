package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
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
@Table(name="favorite_anime")
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
@Getter
public class FavoriteAnime {
	
	@Id
	@Column(name="favorite_anime_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="anime_id")
	private Anime anime;
	
	
	public FavoriteAnime() {}
	
	public FavoriteAnime(User user, Anime anime) {
		this.user = user;
		this.anime = anime;
	}
	
}
