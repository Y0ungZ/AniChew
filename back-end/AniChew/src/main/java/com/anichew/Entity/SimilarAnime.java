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
@Table(name="rating_similaranimes")
@Getter
public class SimilarAnime {
	@Id
	@Column(name="id")
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="anime_id")
	private Anime anime;
	
	@Column(name="similar_anime_id")
	private long similarAnimeId;
	
}
