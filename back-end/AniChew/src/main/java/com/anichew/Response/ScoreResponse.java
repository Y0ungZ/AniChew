package com.anichew.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreResponse {
	private long userId;
	private long id;
	private String type;
	private float score;
}
