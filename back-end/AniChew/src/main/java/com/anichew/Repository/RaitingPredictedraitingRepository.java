package com.anichew.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.RaitingPredictedraiting;
import com.anichew.Entity.User;

public interface RaitingPredictedraitingRepository extends JpaRepository<RaitingPredictedraiting, Long>{
	RaitingPredictedraiting findByUserAndAnime(User user, Anime anime);

}
