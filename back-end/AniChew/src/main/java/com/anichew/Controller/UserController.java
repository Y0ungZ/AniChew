package com.anichew.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anichew.Response.MyInfoResponse;
import com.anichew.Response.UserPageResponse;
import com.anichew.Service.UserService;

@RequestMapping("user")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping(value="/me")
	public ResponseEntity<MyInfoResponse> myInfo (HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		MyInfoResponse myInfoRes = userService.getMyInfo(httpServletReq);		
		
		return new ResponseEntity<MyInfoResponse>(myInfoRes,HttpStatus.OK);
	}
	
	
	@GetMapping("/{userid}")
	public ResponseEntity<UserPageResponse> userPage (@PathVariable("userid") long userid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {

		UserPageResponse userPageRes = null;
		
		
		if(!userService.isExistUser(userid)) {
			return new ResponseEntity<UserPageResponse>(userPageRes,HttpStatus.NOT_FOUND);
		}
		
		userPageRes = userService.userPage(httpServletReq, userid);
				
		return new ResponseEntity<UserPageResponse>(userPageRes,HttpStatus.OK);
	}
	
	@GetMapping("/test/{userid}")
	public ResponseEntity<String> testLogin (@PathVariable("userid") long userid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		if(!userService.isExistUser(userid)) {
			return new ResponseEntity<String>("존재하지 않는 ID",HttpStatus.NOT_FOUND);
		}
		
		String jwt = userService.generateToken(httpServletRes, Long.toString(userid));
				
		return new ResponseEntity<String>(jwt,HttpStatus.OK);
	}
	
}
