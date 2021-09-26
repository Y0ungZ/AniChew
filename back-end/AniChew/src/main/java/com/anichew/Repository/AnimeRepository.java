package com.anichew.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;

public interface AnimeRepository  extends JpaRepository<Anime,Long> {
	Anime findById(long id);
}
