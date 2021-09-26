package com.anichew.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.Animerate;
import com.anichew.Entity.User;

public interface AnimerateRepository  extends JpaRepository<Animerate,Long> {
	List<Animerate> findAllByUser(User user);
	boolean existsByUserAndAnime(User user, Anime anime);
	@Transactional
	boolean deleteByUserAndAnime(User user, Anime anime);
	Animerate findByUserAndAnime(User user, Anime anime);
}
