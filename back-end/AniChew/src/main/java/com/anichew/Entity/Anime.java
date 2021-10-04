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
	private AnimeType type;
	
	@Column(name="anime_episodes")
	private int episodes;
	
	@Column(name="anime_aired_start")
	private LocalDate airedStart;
	
	@Column(name="anime_aired_end")
	private LocalDate airedEnd;
	
	@Column(name="anime_season")
	private String season;
	
	@Column(name="anime_duration")
	private String duration;
	
	@Column(name="synopsis")
	private String synopsis;
	
	@Enumerated(EnumType.STRING)
	@Column(name="anime_status")
	private AnimeStatus status;
	
	@Enumerated(EnumType.STRING)
	@Column(name="anime_rate")
	private Agerate rate;
	
	@OneToMany(mappedBy ="anime", fetch = FetchType.LAZY)
	private List<AnimeGenre> genres;
	

}
