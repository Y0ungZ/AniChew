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
@Table(name= "rating_predictedrating")
@Getter
public class RaitingPredictedraiting {

	@Id
	@Column(name="id")
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="anime_id")
	private Anime anime;
	
	@Column(name="predicted_score")
	private float prediecedScore;
	
	@Column(name="adusted_predicted_score")
	private float adustedPredictedScore;
	
	
}
