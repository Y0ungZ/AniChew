package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.SimilarAnime;

public interface SimilarAnimeRepository extends JpaRepository <SimilarAnime, Long>{
	
	List<SimilarAnime> findAllByAnime(Anime anime);
	
	
}
