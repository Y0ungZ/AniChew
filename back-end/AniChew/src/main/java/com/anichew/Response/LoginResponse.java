package com.anichew.Response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
	private boolean isNewUser;
	private String token;
}
