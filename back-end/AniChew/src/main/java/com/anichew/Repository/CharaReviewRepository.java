package com.anichew.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeReview;
import com.anichew.Entity.Chara;
import com.anichew.Entity.CharaReview;
import com.anichew.Entity.User;

public interface CharaReviewRepository extends JpaRepository<CharaReview, Long> {
	List<CharaReview> findAllByUser(User user);
	List<CharaReview> findAllByChara(Chara chara);
	boolean existsByUserAndChara(User user, Chara chara);
	CharaReview findByUserAndChara(User user, Chara chara);
	CharaReview findById(long id);
	@Transactional
	void deleteById(long id);
}