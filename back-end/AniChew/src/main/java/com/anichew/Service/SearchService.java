package com.anichew.Service;

import java.util.List;

import com.anichew.Response.SearchResponse;

public interface SearchService {
	List<SearchResponse> getAnimeList(String keyword);
	List<SearchResponse> getCharaList(String keyword);
}
