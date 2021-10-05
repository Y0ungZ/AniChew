package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.AnimePromotion;

public interface AnimePromotionRepository extends JpaRepository<AnimePromotion, Long> {
	List<AnimePromotion> findAll();

}
