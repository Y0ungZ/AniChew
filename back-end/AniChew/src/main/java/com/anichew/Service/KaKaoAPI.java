package com.anichew.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


@Service
public class KaKaoAPI {

	
	@Value("${kakao-rest-api-key}")
	private String KAKAO_REST_API_KEY;
	
	@Value("${kakao-redirect-uri}")
	private String KAKAO_REDIRECT_URI;
	
	public String getAccessToken(String authorize_code) {
		String access_token= "";
		String refresh_token ="";
		String reqURL ="https://kauth.kakao.com/oauth/token";		
		
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code")
			.append("&")
			.append("client_id=").append(KAKAO_REST_API_KEY)
			.append("&")
			.append("redirect_uri=").append(KAKAO_REDIRECT_URI)
			.append("&")
			.append("code=").append(authorize_code);
			bw.write(sb.toString());
			bw.flush();
			
			int responseCode = conn.getResponseCode();
			
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			
			sb.setLength(0);
			
			String line ="";
			String result ="";
			
			while((line = br.readLine()) != null) {
				sb.append(line);
			}
			
			result = sb.toString();
			
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(sb.toString());
			
			access_token = element.getAsJsonObject().get("access_token").getAsString();
			refresh_token =  element.getAsJsonObject().get("refresh_token").getAsString();
			
			
			
			br.close();
			bw.close();			
			
		} catch(IOException e) {
			e.printStackTrace();
		} 
		
		return access_token;
	}
	
	
	public Map<String, Object> getUserInfo(String access_token){
		Map<String, Object> userInfo = new HashMap<>();
		String reqURL = "https://kapi.kakao.com/v2/user/me";
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			
			conn.setRequestProperty("Authorization", "Bearer " + access_token);
			
			int responseCode = conn.getResponseCode();			
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));			
			StringBuilder sb = new StringBuilder();
			String line ="";
			
			while((line = br.readLine()) != null) {
				sb.append(line);
			}
			
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(sb.toString());
			
			JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
	        JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
	        
	        String id = element.getAsJsonObject().get("id").getAsString();
	        String nickname = properties.getAsJsonObject().get("nickname").getAsString();	        
	        String email = kakao_account.getAsJsonObject().get("email").getAsString();
	        
	        userInfo.put("id", id);
	        userInfo.put("nickname", nickname);
	        userInfo.put("email", email);
			
	        
	}catch (IOException e) {
			e.printStackTrace();
		}
		
		
		return userInfo;
		
	}
	
	public void kakaoLogout(String access_token) {
		String reqURL = "https://kapi.kakao.com/v1/user/logoust";
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Authorization", "Bearer" + access_token);
			
			int responseCode = conn.getResponseCode();
			
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			StringBuilder sb = new StringBuilder();
			String line ="";
			
			while((line = br.readLine())!=null) {
				sb.append(line);
			}
		}catch(IOException e) {
			e.printStackTrace();
		}
	}
	
	
	

}
