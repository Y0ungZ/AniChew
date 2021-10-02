package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Anime;
import com.anichew.Entity.AnimeChara;
import com.anichew.Entity.Chara;

public interface AnimeCharaRepository  extends JpaRepository<AnimeChara, Long>{
	List<AnimeChara> findAllByChara(Chara chara);
	List<AnimeChara> findAllByAnime(Anime anime);
}	
