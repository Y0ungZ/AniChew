package com.anichew.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anichew.Response.SearchResponse;
import com.anichew.Service.SearchService;

@RequestMapping("search")
@RestController
public class SearchController {
	
	
	@Autowired
	SearchService searchService;
	
	@GetMapping("/anime/{keyword}")
	public ResponseEntity<List<SearchResponse>> animeSearch (@PathVariable("keyword") String keyword) {
		
		
		List<SearchResponse> response = null;
		
		System.out.println(keyword);
		
		response = searchService.getAnimeList(keyword);
		
		
		return new ResponseEntity<List<SearchResponse>>(response,HttpStatus.OK);
	}
		
	@GetMapping("/chara/{keyword}")
	public ResponseEntity<List<SearchResponse>> charaSearch (@PathVariable("keyword") String keyword) {
		
		
		List<SearchResponse> response = null;
		
		System.out.println(keyword);
		
		response = searchService.getCharaList(keyword);
		
		
		return new ResponseEntity<List<SearchResponse>>(response,HttpStatus.OK);
	}
	
	
	
}
