package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name="genre")
@Getter
public class Genre {

	@Id
	@Column(name="genre_id")
	private long id;
	
	@Column(name="genre_name")
	private String name;
	
}
