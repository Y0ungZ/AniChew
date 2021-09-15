package com.anichew.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anichew.DTO.UserDTO;
import com.anichew.Entity.User;
import com.anichew.Entity.UserGender;
import com.anichew.Entity.UserStatus;
import com.anichew.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	

	@Autowired
	private UserRepository userRepo;
	
	public void signUp(Map<String,Object> userInfo) {
		UserDTO userDTO = new UserDTO();
		
		
		long id = Long.parseLong((String)userInfo.get("id"));
		userDTO.setId(id);
		userDTO.setEmail((String)userInfo.getOrDefault("email", null));		
		String nickname ="";		
		String nicknamePrefix[] = {"고독한","즐거운","용감한","활발한", "냉정한", "장난꾸러기", "무시무시한", "화려한", "미스테리한", "사랑스러운"};
		String nicknameSuffix[] = {"손바닥", "발바닥", "치킨마요", "고추참치", "냥이" ,"댕댕이", "전문가", "아마추어", "오톡이", "고로케" };
		
		int prefixIdx = LocalDateTime.now().getSecond() % 10;
		int suffixIdx = Math.abs((LocalDateTime.now().getSecond()*(int)(id%10)))%10;
		
		
			
		nickname = nicknamePrefix[prefixIdx] + " " + nicknameSuffix[suffixIdx];
		userDTO.setNickname(nickname);
		userDTO.setGender(UserGender.NONE);
		userDTO.setCreatedDate(LocalDateTime.now());
		userDTO.setProfileImg(null);
		userDTO.setBirthday(LocalDate.now());
		

		User user = new User.UserBuilder(userDTO).build();
		userRepo.save(user);
		
	}
	
	public boolean isNewUser(long id) {		
		
		if(userRepo.existsById(id))
			return false;
		
		return true;
	}
	
}
