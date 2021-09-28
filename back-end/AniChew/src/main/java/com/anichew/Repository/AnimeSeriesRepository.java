package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeSeries;
import com.anichew.Entity.Series;

public interface AnimeSeriesRepository extends JpaRepository<AnimeSeries, Long> {
	AnimeSeries findByAnime(Anime anime);	
	List<AnimeSeries> findAllBySeries(Series series);
}
