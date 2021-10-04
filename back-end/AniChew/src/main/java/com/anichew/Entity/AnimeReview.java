package com.anichew.Entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="anime_review")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
public class AnimeReview {
	
	@Id
	@Column(name="anime_review_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="anime_id")
	private Anime anime;
	
	@Column(name="anime_review_content")
	private String content;
	
	@Column(name="anime_review_created_date")
	private LocalDateTime createdDate;
	
	@Column(name="anime_review_modified_date")
	private LocalDateTime modifiedDate;
	
	@OneToMany(mappedBy="review", cascade=CascadeType.ALL)
	List<AnimeReviewLove> loves;
	
	
	
	@Builder
	public AnimeReview(long id, User user, Anime anime, String content, LocalDateTime createdDate, LocalDateTime modifiedDate) {
		this.id = id;
		this.user = user;
		this.anime = anime;
		this.content = content;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
	}
	
}
