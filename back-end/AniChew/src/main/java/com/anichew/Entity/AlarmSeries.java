package com.anichew.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Builder;
import lombok.Getter;

@Entity
@Table(name="alram_series")
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
@Getter
public class AlarmSeries {
	
	@Id
	@Column(name="alarm_series_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="series_id")
	private Series series;
	
	@Builder
	public AlarmSeries(User user, Series series) {
		this.user = user;
		this.series = series;		
	}
	
}
