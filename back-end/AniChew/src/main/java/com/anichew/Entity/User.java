package com.anichew.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import io.jsonwebtoken.lang.Assert;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name ="user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User {
	
	@Id	
	@Column(name="user_id", nullable=false)
	private long id;
	
	@Column(name="user_nickname" , nullable=false)
	private String nickname;
	
	@Column(name="user_email")
	private String email;
	
	@Enumerated(EnumType.STRING)
	@Column(name="user_status")
	private UserStatus status;
	
	@Enumerated(EnumType.STRING)
	@Column(name="user_gender")
	private UserGender gender;
	
	@Column(name="user_birthday")
	private LocalDate birthday;
	
	@Column(name="user_avatar")
	private String avatar;
	
	@Column(name="user_created_date")
	private LocalDateTime createdDate;	
	
	@OneToMany(mappedBy ="user", fetch = FetchType.LAZY)
	private List<FavoriteAnime> favoriteAnimes;
	
	@OneToMany(mappedBy ="user", fetch = FetchType.LAZY)
	private List<FavoriteChara> favoriteCharas;
	
	@OneToMany(mappedBy ="user", fetch = FetchType.LAZY)
	private List<FavoriteSeiyu> favoriteSeiyus;
	
	
	@Builder
	public User(long id, String email, UserStatus status, UserGender gender,  String nickname, String avatar, LocalDate birthday, LocalDateTime createdDate) {
		Assert.hasText(nickname, "nickname must not be empty");
		
		this.id = id;
		this.email = email;
		this.status = status;
		this.gender = gender;
		this.nickname = nickname;
		this.avatar = avatar;
		this.birthday = birthday;
		this.createdDate = createdDate;
		
	}

	
	
}
