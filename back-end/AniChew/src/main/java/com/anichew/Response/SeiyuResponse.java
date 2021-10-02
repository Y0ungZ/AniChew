package com.anichew.Response;

import com.anichew.Entity.Seiyu;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeiyuResponse {
	private long id;
	private String name;	
	
	public SeiyuResponse() {}
	public SeiyuResponse(Seiyu seiyu) {
		this.id = seiyu.getId();
		this.name = seiyu.getName();
	}
	
}
