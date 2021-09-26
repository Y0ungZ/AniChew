package com.anichew.Entity;

import javax.persistence.Column;

import lombok.Getter;

@Getter
public class Series {
	
	@Column(name="series_id")
	private long id;
	
	@Column(name="series_name")
	private String name;
	
	
}
