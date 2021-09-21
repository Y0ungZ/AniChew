package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name="chara")
@Getter
public class Chara {
	
	@Id
	@Column(name="chara_id")
	private long id;
	
	@OneToOne
	@JoinColumn(name="seiyu_id")
	private Seiyu seiyu;

	
	@Column(name="chara_first_name")
	private String firstName;
	
	@Column(name="chara_last_name")
	private String lastName;
	
	@Column(name="chara_role")
	private CharaRole role;
	
}
