package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="anime_series")
public class AnimeSeries {
	
	@Id
	@Column(name="anime_series_id")
	private long id;
	
}
