package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.RecommendStart;

public interface RecommendStartRepository extends JpaRepository<RecommendStart, Long> {
	
	List<RecommendStart> findAll();
	
}
