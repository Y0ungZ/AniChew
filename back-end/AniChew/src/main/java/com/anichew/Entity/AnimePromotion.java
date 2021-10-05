package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="anime_promotion")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
public class AnimePromotion {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="anime_promotion_id")
	private long id;
	
	@Column(name="anime_id")
	private long animeId;
	
	
	@Builder
	public AnimePromotion(long animeId) {
		this.animeId = animeId;
	}
}
