package com.anichew.Repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Chara;
import com.anichew.Entity.FavoriteChara;
import com.anichew.Entity.User;

public interface FavoriteCharaRepository  extends JpaRepository<FavoriteChara,Long> {
	FavoriteChara findByCharaAndUser(Chara chara, User user);
	boolean existsByCharaAndUser(Chara chara, User user);
	@Transactional
	void deleteByCharaAndUser(Chara chara, User user);
	
}
