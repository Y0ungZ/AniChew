package com.anichew.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeReview;
import com.anichew.Entity.User;

public interface AnimeReviewRepository extends JpaRepository<AnimeReview, Long> {
	List<AnimeReview> findAllByUser(User user);
	List<AnimeReview> findAllByAnime(Anime anime);
	List<AnimeReview> findByAnime(Anime anime, Pageable pageable);
	boolean existsByUserAndAnime(User user, Anime anime);
	AnimeReview findByUserAndAnime(User user, Anime anime);
	AnimeReview findById(long id);
	@Transactional
	void deleteById(long id);
}