package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="new_figure")
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class NewFigure {

	@Id
	@Column(name="new_figure_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="new_figure_series_title")
	private String title;
	
	@Column(name="new_figure_url")
	private String url;
	
	@Column(name="new_figure_alarm")
	boolean alarm;
	
	@Builder
	public NewFigure(long id, String title, String url, boolean alarm) {
		this.id = id;
		this.title = title;
		this.url = url;
		this.alarm = alarm;
	}
	
	
}
