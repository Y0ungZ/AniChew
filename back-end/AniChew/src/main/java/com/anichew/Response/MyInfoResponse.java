package com.anichew.Response;

import java.time.LocalDate;

import com.anichew.Entity.UserGender;
import com.anichew.Entity.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyInfoResponse {
	private long userId;
	private String nickname;
	private String email;
	private String avatar;
	private UserStatus status;
	private UserGender gender;
	private LocalDate birthday;
}
