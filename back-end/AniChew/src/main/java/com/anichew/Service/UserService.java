package com.anichew.Service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.anichew.Request.CoverRequest;
import com.anichew.Request.UserRequest;
import com.anichew.Response.MyInfoResponse;
import com.anichew.Response.UserPageResponse;

public interface UserService {
	void signUp(Map<String, Object> userInfo);
	boolean existsUser(long id);
	String generateToken(HttpServletRequest httpServletReq, HttpServletResponse httpServletResponse, String userid);
	boolean generateRefreshToken(HttpServletRequest httpServletReq, HttpServletResponse httpServletRes);
	MyInfoResponse getMyInfo(HttpServletRequest httpServletReq);
	boolean isExistUser(long userid);
	UserPageResponse userPage(HttpServletRequest httpServletReq, long userid);
	void logout(HttpServletRequest httpServletReq, HttpServletResponse httpServletRes);
	MyInfoResponse setUserInfo(HttpServletRequest httpServletReq, UserRequest req);
	boolean checkToken(HttpServletRequest httpServletReq);
	String uploadPhoto(MultipartFile file, HttpServletRequest httpServletReq);
	boolean setAvatar(String avatar, HttpServletRequest httpServletReq);
	boolean setCover(HttpServletRequest httpServletReq, CoverRequest req);
	boolean deleteCover(HttpServletRequest httpServletReq);
	boolean deleteAvatar(HttpServletRequest httpServletReq);
	void deleteRefreshToken(HttpServletRequest httpServletReq, HttpServletResponse httpServletRes);
	
	
}
