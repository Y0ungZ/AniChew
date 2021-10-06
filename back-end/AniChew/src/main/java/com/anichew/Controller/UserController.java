package com.anichew.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.anichew.Request.CoverRequest;
import com.anichew.Request.UserRequest;
import com.anichew.Response.LoginResponse;
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
		
		MyInfoResponse myInfoRes = null;
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<MyInfoResponse>(myInfoRes, HttpStatus.UNAUTHORIZED);
		
		
		myInfoRes = userService.getMyInfo(httpServletReq);		
		
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
	public ResponseEntity<LoginResponse> testLogin (@PathVariable("userid") long userid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		
		
		LoginResponse response = new LoginResponse();
		
		if(!userService.isExistUser(userid)) {
			return new ResponseEntity<LoginResponse>(response,HttpStatus.NOT_FOUND);
		}		

		
		String jwt = userService.generateToken(httpServletReq, httpServletRes, Long.toString(userid));
		
		response.setToken(jwt);
		
		return new ResponseEntity<LoginResponse>(response,HttpStatus.OK);
	}
	
	
	@PutMapping
	public ResponseEntity<MyInfoResponse> setUserInfo(HttpServletRequest httpServletReq, @RequestBody UserRequest req){
				
		
		MyInfoResponse response = null;
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<MyInfoResponse>(response, HttpStatus.UNAUTHORIZED);
		
		
		response = userService.setUserInfo(httpServletReq, req);
				
		
		return new ResponseEntity<MyInfoResponse>(response,HttpStatus.OK);
		
	}
	
	@PostMapping("/avatar")
	public ResponseEntity<String> avatar (HttpServletRequest httpServletReq, @RequestPart MultipartFile file){
				
		
		String avatar = null;
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>(avatar, HttpStatus.UNAUTHORIZED);
		
		avatar = userService.uploadPhoto(file, httpServletReq);		
	
		
		return new ResponseEntity<String>(avatar,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/avatar")
	public ResponseEntity<MyInfoResponse> deleteAvatar (HttpServletRequest httpServletReq){
		
		MyInfoResponse response = null;
		
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<MyInfoResponse>(response, HttpStatus.UNAUTHORIZED);
		
		
		if(userService.deleteAvatar(httpServletReq))
			response = userService.getMyInfo(httpServletReq);
		
	
		return new ResponseEntity<MyInfoResponse>(response,HttpStatus.OK);
	}
	
	
	@PostMapping("/cover")
	public ResponseEntity<String> coverUpload (HttpServletRequest httpServletReq, @RequestPart MultipartFile file){
				
		String cover = null;
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<String>(cover, HttpStatus.UNAUTHORIZED);
		
		
		cover = userService.uploadPhoto(file, httpServletReq);
		
	
		return new ResponseEntity<String>(cover,HttpStatus.OK);
	}
	
	@PutMapping("/cover")
	public ResponseEntity<MyInfoResponse> cover (HttpServletRequest httpServletReq, @RequestBody CoverRequest req){
		
		MyInfoResponse response = null;
		
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<MyInfoResponse>(response, HttpStatus.UNAUTHORIZED);
		
		
		if(userService.setCover(httpServletReq, req))
			response = userService.getMyInfo(httpServletReq);
		
	
		return new ResponseEntity<MyInfoResponse>(response,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/cover")
	public ResponseEntity<MyInfoResponse> deleteCover (HttpServletRequest httpServletReq){
		
		MyInfoResponse response = null;
		
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<MyInfoResponse>(response, HttpStatus.UNAUTHORIZED);
		
		
		if(userService.deleteCover(httpServletReq))
			response = userService.getMyInfo(httpServletReq);
		
	
		return new ResponseEntity<MyInfoResponse>(response,HttpStatus.OK);
	}
	
	
	
	
}
