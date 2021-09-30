package com.anichew.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Review;
import com.anichew.Entity.ReviewLove;
import com.anichew.Entity.User;

public interface ReviewLoveRepository  extends JpaRepository<ReviewLove, Long>{
	boolean existsByUserAndReview(User user, Review review);	
}
