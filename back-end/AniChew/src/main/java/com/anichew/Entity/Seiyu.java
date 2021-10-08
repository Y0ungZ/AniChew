package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name="seiyu")
@Getter
public class Seiyu {
	
	@Id
	@Column(name="seiyu_id")
	long id;
	
	@Column(name="seiyu_name")
	String name;

}
