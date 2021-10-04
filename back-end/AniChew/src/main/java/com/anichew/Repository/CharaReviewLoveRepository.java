package com.anichew.Repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.CharaReview;
import com.anichew.Entity.CharaReviewLove;
import com.anichew.Entity.User;

public interface CharaReviewLoveRepository  extends JpaRepository<CharaReviewLove, Long>{
	boolean existsByUserAndReview(User user, CharaReview review);	
	@Transactional
	void deleteByUserAndReview(User user, CharaReview review);
	
}
