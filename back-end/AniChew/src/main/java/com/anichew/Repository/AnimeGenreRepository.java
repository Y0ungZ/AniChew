package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeGenre;

public interface AnimeGenreRepository extends JpaRepository<AnimeGenre,Long>{
	List<AnimeGenre> findAllByAnime(Anime anime);
}
