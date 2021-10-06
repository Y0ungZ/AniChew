package com.anichew.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Series;

public interface SeriesRepository extends JpaRepository<Series,Long> {
	
	Series findByName(String name);

	
}
