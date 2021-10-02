package com.anichew.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anichew.Response.CharaDetailResponse;
import com.anichew.Service.CharaService;
import com.anichew.Service.UserService;

@RestController
@RequestMapping("chara")
public class CharaController {
	
	@Autowired
	CharaService charaService;
	
	@Autowired
	UserService userService;
	
	
	@GetMapping(value="/{charaid}")
	public ResponseEntity<CharaDetailResponse> getAnime (@PathVariable("charaid") long charaid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
			
		
		CharaDetailResponse response = null;
		
		if(!charaService.existsChara(charaid)) {
			return new ResponseEntity<CharaDetailResponse>(response,HttpStatus.NOT_FOUND);
		}	
		
		response = charaService.charaDetail(httpServletReq, charaid);
		
		return new ResponseEntity<CharaDetailResponse>(response,HttpStatus.OK);
	}
	
	@PostMapping(value="/{charaid}")
	public ResponseEntity<CharaDetailResponse> setFavorite (@PathVariable("charaid") long charaid, HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
			
		
		CharaDetailResponse response = null;
		
		if(!userService.checkToken(httpServletReq))
			return new ResponseEntity<CharaDetailResponse>(response, HttpStatus.UNAUTHORIZED);
		
		if(!charaService.existsChara(charaid)) {
			return new ResponseEntity<CharaDetailResponse>(response,HttpStatus.NOT_FOUND);
		}
		
		response = charaService.charaDetail(httpServletReq, charaid);
		
		return new ResponseEntity<CharaDetailResponse>(response,HttpStatus.OK);
	}

}
