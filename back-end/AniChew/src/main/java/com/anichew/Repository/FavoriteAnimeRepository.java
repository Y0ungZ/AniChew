package com.anichew.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.FavoriteAnime;

public interface FavoriteAnimeRepository  extends JpaRepository<FavoriteAnime,Long> {
	
}
