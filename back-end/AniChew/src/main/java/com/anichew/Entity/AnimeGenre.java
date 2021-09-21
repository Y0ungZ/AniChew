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
@Table(name="anime_genre")
@Getter
public class AnimeGenre {
	
	@Id
	@Column(name="anime_genre_id")
	private long id;
		
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="anime_id")
	private Anime anime;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="genre_id")
	private Genre genre;

}
