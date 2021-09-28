package com.anichew.Request;

import com.anichew.Entity.UserGender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
	String nickname;
	String birthday;
	String avatar;
	UserGender gender;
}
