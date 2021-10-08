package com.anichew.Response;

import java.util.List;

import com.anichew.Entity.Chara;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CharaDetailResponse {
	private long id;
	private String lastName;
	private String firstName;
	private String series;	
	private List<AnimeResponse> animes;
	private SeiyuResponse seiyu;
	private boolean favorite;
	private float myScore;
	private float avgScore;
	private int scores[];
	
	
	
	public CharaDetailResponse() {}
	public CharaDetailResponse(Chara chara) {
		this.id = chara.getId();
		this.lastName = chara.getLastName();
		this.firstName = chara.getFirstName();
		this.seiyu = new SeiyuResponse(chara.getSeiyu());
	}
	
}
