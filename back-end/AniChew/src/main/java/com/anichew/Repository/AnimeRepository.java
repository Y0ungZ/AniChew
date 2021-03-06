package com.anichew.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;

public interface AnimeRepository  extends JpaRepository<Anime,Long> {
	Anime findById(long id);	
	List<Anime> findAllByKoreanNameContaining(String keyword);
	List<Anime> findByAiredStartBeforeOrderByAiredStartDesc(LocalDate date);
	
	
}
