package com.anichew.Service;

import java.time.LocalDate;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.anichew.Entity.UserGender;
import com.anichew.Response.MyInfoResponse;
import com.anichew.Response.UserPageResponse;

public interface UserService {
	void signUp(Map<String, Object> userInfo);
	boolean existsUser(long id);
	String generateToken(HttpServletResponse httpServletResponse, String userid);
	MyInfoResponse getMyInfo(HttpServletRequest httpServletReq);
	boolean isExistUser(long userid);
	UserPageResponse userPage(HttpServletRequest httpServletReq, long userid);
	void logout(HttpServletRequest httpServletReq);
	boolean setBirthday(HttpServletRequest httpServletReq, LocalDate birthday);
	boolean setEmail(HttpServletRequest httpServletReq, String email);
	boolean setGender(HttpServletRequest httpServletReq, UserGender gender);
	boolean checkToken(HttpServletRequest httpServletReq);
	
}
