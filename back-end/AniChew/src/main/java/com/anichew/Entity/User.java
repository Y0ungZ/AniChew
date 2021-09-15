package com.anichew.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.anichew.DTO.UserDTO;

@Entity(name ="user")
public class User {
	
	@Id
	@Column(name="user_id")
	private long id;
	
	@Column(name="user_email")
	private String email;
	
	@Column(name="user_status")
	private UserStatus status;
	
	@Column(name="user_gender")
	private UserGender gender;
	
	@Column(name="user_birthday")
	private LocalDate birthday;
	
	@Column(name="user_nickname")
	private String nickname;
	
	@Column(name="user_profile_img")
	private String profileImg;
	
	@Column(name="user_created_date")
	private LocalDateTime createdDate;

	public User() {}
	
	private User(UserBuilder builder) {
		this.id = builder.id;
		this.email = builder.email;
		this.status = builder.status;
		this.gender = builder.gender;
		this.birthday = builder.birthday;
		this.nickname = builder.nickname;
		this.profileImg = builder.profileImg;
		this.createdDate = builder.createdDate;
	}
	
	public static class UserBuilder implements CommonBuilder<User>{
		private final long id;
		private final String email;
		private final UserStatus status;
		private final UserGender gender;
		private final LocalDate birthday;
		private final String nickname;
		private final String profileImg;
		private final LocalDateTime createdDate;
		
		
		public UserBuilder(UserDTO userDTO) {
			this.id = userDTO.getId();
			this.email = userDTO.getEmail();
			this.status = userDTO.getStatus();
			this.gender = userDTO.getGender();
			this.birthday = userDTO.getBirthday();
			this.nickname = userDTO.getNickname();
			this.profileImg = userDTO.getProfileImg();
			this.createdDate = userDTO.getCreatedDate();			
		}
		
		@Override
		public User build() {
			return new User(this);
		}
		
	}
	
}
