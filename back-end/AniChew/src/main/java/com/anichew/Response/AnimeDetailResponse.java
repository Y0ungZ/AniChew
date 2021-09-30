package com.anichew.Response;

import java.time.LocalDate;
import java.util.List;

import com.anichew.Entity.Agerate;
import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeStatus;
import com.anichew.Entity.AnimeType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimeDetailResponse {
	private long id;
	private String name;
	private String englishName;
	private String japaneseName;
	private String koreanName;
	private AnimeType type;
	private float avgScore;
	private long scores[] = new long[5];
	private int episodes;
	private LocalDate airedStart;
	private LocalDate airedEnd;
	private String season;
	private String duration;
	private AnimeStatus status;
	private Agerate rate;
	private List<GenreResponse> genres;
	private List<ReviewResponse> reviews;
	private List<AnimeResponse> relatedAnimes;
	private SeriesResponse series;
	private boolean isFavorite;
	
	
	public AnimeDetailResponse() {}
	public AnimeDetailResponse(Anime anime) {
		this.id = anime.getId();
		this.name = anime.getName();
		this.englishName = anime.getEnglishName();
		this.japaneseName = anime.getJapaneseName();
		this.koreanName = anime.getKoreanName();
		this.type = anime.getType();
		this.episodes = anime.getEpisodes();
		this.airedStart = anime.getAiredStart();
		this.airedEnd = anime.getAiredEnd();
		this.season = anime.getSeason();
		this.duration = anime.getDuration();
		this.status = anime.getStatus();	
		this.rate = anime.getRate();
	}
	
}
