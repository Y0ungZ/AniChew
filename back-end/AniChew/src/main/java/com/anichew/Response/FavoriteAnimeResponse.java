package com.anichew.Response;

import com.anichew.Entity.AnimeType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteAnimeResponse {
	private long id;
	private String name;
	private String englishName;
	private String japanseName;
	private String koreanName;
	private AnimeType type;
	private String season;
}
