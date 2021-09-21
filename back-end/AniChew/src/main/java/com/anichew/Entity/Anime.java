package com.anichew.Entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="anime")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Anime {
	
	@Id
	@Column(name="anime_id")
	private long id;
	
	@Column(name="anime_name")
	private String name;
	

	@Column(name="anime_english_name")
	private String englishName;
	
	@Column(name="anime_japanese_name")
	private String japaneseName;
	
	@Column(name="anime_korean_name")
	private String koreanName;
	
	@Enumerated(EnumType.STRING)
	@Column(name="anime_type")
	AnimeType type;
	
	@Column(name="anime_episodes")
	int episodes;
	
	@Column(name="anime_aired_start")
	LocalDate airedStart;
	
	@Column(name="anime_aired_end")
	LocalDate airedEnd;
	
	@Column(name="anime_season")
	String season;
	
	@Column(name="anmie_duration")
	String duration;
	
	@Column(name="anime_status")
	AnimeStatus status;
	
	@OneToMany(mappedBy ="anime", fetch = FetchType.LAZY)
	List<AnimeGenre> genres;
	
	@Builder
	public Anime(long id, String name, String englishName, String japanesName, String koreanName, AnimeType type, int episodes, LocalDate airedStart, LocalDate airedEnd, String season, String duration, AnimeStatus status) {
		this.id = id;
		this.name = name;
		this.englishName = englishName;
		this.japaneseName = japanesName;
		this.koreanName = koreanName;
		this.type = type;
		this.episodes = episodes;
		this.airedStart = airedStart;
		this.airedEnd = airedEnd;
		this.season = season;
		this.duration = duration;
		this.status = status;
		
	}

}
