package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.Chara;

public interface CharaRepository extends JpaRepository<Chara,Long> {
	boolean existsById(long charaid);
	Chara findById(long charaid);
	List<Chara> findAllByFirstNameContainingOrLastNameContaining(String keyword1, String keyword2);

}
