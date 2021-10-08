package com.anichew.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.anichew.Entity.AlarmSeries;
import com.anichew.Entity.NewFigure;
import com.anichew.Entity.Series;
import com.anichew.Entity.User;
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
	
	
	@Scheduled(fixedDelay = 1000 * 60 * 10)
	public void sendAlarm() {
		List<NewFigure> figures = newFigureRepo.findAllByAlarm(false);
		for(NewFigure figure : figures) {
			
			Series series = seriesRepo.findByName(figure.getTitle());
			
			if(series == null) continue;
			
			List<AlarmSeries> alarmSeries = alarmSeriesRepo.findAllBySeries(series);
			
			System.out.println(alarmSeries.size());
			
			for(AlarmSeries aSereis : alarmSeries) {
				User user = aSereis.getUser();
				if(user.getEmail()!=null)
					sendMail(user.getEmail(),"[Anichew] "+aSereis.getSeries().getName()+"의 신 상품이 나왔어요!", "여기에서 확인하세요! \n" + figure.getUrl());

				
			}
			
			NewFigure doneFigure = NewFigure.builder()
					.id(figure.getId())
					.title(figure.getTitle())
					.url(figure.getUrl())
					.alarm(true)
					.build();
			newFigureRepo.save(doneFigure);
			
		}
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
