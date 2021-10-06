package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.NewFigure;

public interface NewFigureRepository extends JpaRepository<NewFigure, Long> {
	List<NewFigure> findAllByAlarm(boolean state);
}
