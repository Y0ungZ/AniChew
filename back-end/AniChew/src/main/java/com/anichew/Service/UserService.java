package com.anichew.Service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.anichew.Request.UserRequest;
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
	MyInfoResponse setUserInfo(HttpServletRequest httpServletReq, UserRequest req);
	boolean checkToken(HttpServletRequest httpServletReq);
	
}
