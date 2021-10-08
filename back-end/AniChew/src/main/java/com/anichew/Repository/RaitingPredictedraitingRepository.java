package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.RaitingPredictedraiting;
import com.anichew.Entity.User;

public interface RaitingPredictedraitingRepository extends JpaRepository<RaitingPredictedraiting, Long>{
	RaitingPredictedraiting findByUserAndAnime(User user, Anime anime);
	List<RaitingPredictedraiting> findByUserAndAdustedPredictedScoreGreaterThanOrderByAdustedPredictedScore(User user,float score);

}
