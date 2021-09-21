package com.anichew.Service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.anichew.Response.MyInfoResponse;
import com.anichew.Response.UserPageResponse;

public interface UserService {
	void signUp(Map<String, Object> userInfo);
	boolean isNewUser(long id);
	boolean generateToken(HttpServletResponse httpServletResponse, String userid);
	MyInfoResponse getMyInfo(HttpServletRequest httpServletReq);
	boolean isExistUser(long userid);
	UserPageResponse userPage(HttpServletRequest httpServletReq, long userid);
	
}
