package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.Builder;
import lombok.Getter;

@Entity
@Table(name="charascore")
@Getter
@DynamicInsert
public class Charascore {

	@Id
	@Column(name="charascore_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="chara_id")
	Chara chara;
	
	
	@Column(name="charascore_score")
	float score;
	
	@Builder
	public Charascore(long id, User user, Chara chara, float score) {
		this.id = id;
		this.user = user;
		this.chara = chara;
		this.score = score;
	}	
	
	
	
}
