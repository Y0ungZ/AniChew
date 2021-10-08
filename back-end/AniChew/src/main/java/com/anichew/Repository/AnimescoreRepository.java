package com.anichew.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.anichew.Entity.Anime;
import com.anichew.Entity.Animescore;
import com.anichew.Entity.User;

public interface AnimescoreRepository  extends JpaRepository<Animescore,Long> {
	List<Animescore> findAllByUser(User user);
	boolean existsByUserAndAnime(User user, Anime anime);
	
	@Transactional
	void deleteByUserAndAnime(User user, Anime anime);
	Animescore findByUserAndAnime(User user, Anime anime);
	
	List<Animescore> findAllByAnime(Anime anime);
	
	
	@Query(value="SELECT AVG(a.animescore_score) FROM Animescore a where a.anime_id = :anime_id", nativeQuery=true)
	long avgByAnime(@Param("anime_id") Long anime_id);
	long countByAnime(Anime anime);
	long countByAnimeAndScore(Anime anime, float score);

}
