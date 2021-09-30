package com.anichew.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.Review;
import com.anichew.Entity.User;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	List<Review> findAllByUser(User user);
	List<Review> findAllByAnime(Anime anime);
	List<Review> findAllByUserAndAnime(User user, Anime anime);
	Review findById(long id);
	@Transactional
	void deleteById(long id);
}
