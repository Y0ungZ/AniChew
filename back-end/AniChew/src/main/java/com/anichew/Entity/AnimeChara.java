package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name="anime_chara")
@Getter
public class AnimeChara {
	
	@Id
	@Column(name="anime_chara_id")
	long id;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="anime_id")
	Anime anime;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="chara_id")
	Chara chara;
}
