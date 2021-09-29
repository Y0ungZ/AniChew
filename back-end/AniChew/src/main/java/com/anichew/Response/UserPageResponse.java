package com.anichew.Response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPageResponse {
	private long userid;
	private String nickname;
	private String email;
	private String avatar;
	private String cover;
	private boolean isMine;
	private List<FavoriteAnimeResponse> favoriteAnimes;
	private List<FavoriteCharaResponse> favoriteCharas;
	private List<FavoriteSeiyuResponse> favoriteSeiyus;
}
