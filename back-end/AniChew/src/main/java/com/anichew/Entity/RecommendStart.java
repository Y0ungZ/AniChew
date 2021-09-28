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
@Table(name="recommend_start")
@Getter
public class RecommendStart {
	
	@Id
	@Column(name="recommend_start_id")
	long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="anime_id")
	Anime anime;
	
}
