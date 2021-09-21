package com.anichew.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.FavoriteChara;

public interface FavoriteCharaRepository  extends JpaRepository<FavoriteChara,Long> {

}
