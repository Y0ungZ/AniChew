package com.anichew.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.Animescore;
import com.anichew.Entity.User;

public interface AnimescoreRepository  extends JpaRepository<Animescore,Long> {
	List<Animescore> findAllByUser(User user);
	boolean existsByUserAndAnime(User user, Anime anime);
	@Transactional
	boolean deleteByUserAndAnime(User user, Anime anime);
	Animescore findByUserAndAnime(User user, Anime anime);
}
