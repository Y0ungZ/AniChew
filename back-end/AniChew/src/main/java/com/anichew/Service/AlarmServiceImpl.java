package com.anichew.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.anichew.Entity.AlarmSeries;
import com.anichew.Entity.NewFigure;
import com.anichew.Entity.Series;
import com.anichew.Repository.AlarmSeriesRepository;
import com.anichew.Repository.NewFigureRepository;
import com.anichew.Repository.SeriesRepository;

@Service
public class AlarmServiceImpl {

	
	@Autowired
	private AlarmSeriesRepository alarmSeriesRepo;
	
	@Autowired
	private NewFigureRepository newFigureRepo;
	
	
	@Autowired
	private SeriesRepository seriesRepo;
	
	
	@Autowired
	private JavaMailSender emailSender;
	
	
	@Async
	public void sendMail(String to, String sub, String text) {
		SimpleMailMessage message = new SimpleMailMessage();		
		message.setTo(to);		
		message.setSubject(sub);		
		message.setText(text);
		emailSender.send(message);
		
	}
	
	public void sendAlarm() {
		
		List<NewFigure> figures = newFigureRepo.findAllByAlarm(false);
		for(NewFigure figure : figures) {
			
			Series series = seriesRepo.findByName(figure.getTitle());
			
			if(series == null) continue;
			
			List<AlarmSeries> alarmSeries = alarmSeriesRepo.findAllBySeries(series);
			
			
			for(AlarmSeries aSereis : alarmSeries) {
				
				
				
				
				
			}
			
			
		}
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
