package com.anichew.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Chara;
import com.anichew.Entity.Charascore;
import com.anichew.Entity.User;

public interface CharascoreRepository extends JpaRepository<Charascore,Long> {
	Charascore findByCharaAndUser(Chara chara, User user);
	List<Charascore> findAllByChara(Chara chara);
	boolean existsByCharaAndUser(Chara chara,User user);
	
	@Transactional
	void deleteByCharaAndUser(Chara chara, User user);
}
