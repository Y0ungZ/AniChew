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
@Table(name="anime_series")
@Getter
public class AnimeSeries {
	
	@Id
	@Column(name="anime_series_id")
	private long id;	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="series_id")	
	private Series series;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="anime_id")
	private Anime anime;
}
