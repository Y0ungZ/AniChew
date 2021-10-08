package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="series")
@Getter
@Setter
public class Series {
	
	@Id
	@Column(name="series_id")
	private long id;
	
	@Column(name="series_name")
	private String name;	
	
}
