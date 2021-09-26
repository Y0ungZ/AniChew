package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="anime_series")
@Getter
public class AnimeSeries {
	
	@Id
	@Column(name="anime_series_id")
	private long id;	
	
	@Column(name="series_id")
	private long serires_id;
	
	@Column(name="anime_id")
	private long animeId;
}
