package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.AlarmSeries;
import com.anichew.Entity.Series;
import com.anichew.Entity.User;

public interface AlarmSeriesRepository extends JpaRepository<AlarmSeries, Long> {
	List<AlarmSeries> findAllBySeries(Series series);

	AlarmSeries findByUserAndSeries(User user, Series series);

}
