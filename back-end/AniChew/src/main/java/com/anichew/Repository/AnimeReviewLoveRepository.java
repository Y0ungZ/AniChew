package com.anichew.Repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.AnimeReview;
import com.anichew.Entity.AnimeReviewLove;
import com.anichew.Entity.User;

public interface AnimeReviewLoveRepository  extends JpaRepository<AnimeReviewLove, Long>{
	boolean existsByUserAndReview(User user, AnimeReview review);	
	@Transactional
	void deleteByUserAndReview(User user, AnimeReview review);
}
