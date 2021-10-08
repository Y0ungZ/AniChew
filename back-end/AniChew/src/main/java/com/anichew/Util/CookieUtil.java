package com.anichew.Util;

import java.util.Collection;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
public class CookieUtil {
	 public final static long USER_NULL = -1;
		
    public Cookie createCookie(String cookieName, String value, int time){
        Cookie token = new Cookie(cookieName,value);
        token.setHttpOnly(true);
        token.setMaxAge(time);
        token.setPath("/");
        return token;
    }

    public Cookie getCookie(HttpServletRequest req, String cookieName){
        final Cookie[] cookies = req.getCookies();
        if(cookies==null) return null;
        for(Cookie cookie : cookies){
            if(cookie.getName().equals(cookieName))
                return cookie;
        }
        return null;
    }
    
    public long getUserid(HttpServletRequest req, JwtUtil jwtUtil, String cookieName) {    
    	Cookie cookie = getCookie(req,cookieName);    	
    	long userid = USER_NULL;
    	
    	
    	
    	if(cookie != null) {
    		String token = cookie.getValue();
    		userid = Long.parseLong(jwtUtil.getUserid((token)));    	
    	}
    	   	
    	
    	return userid;
    }
    
    public void deleteCookie(HttpServletRequest req, HttpServletResponse res, String cookieName) {
    	Cookie cookie = new Cookie(cookieName,null);
    	cookie.setMaxAge(0);
    	cookie.setPath("/");
    	res.addCookie(cookie);
    	Collection<String> headers = res.getHeaders(HttpHeaders.SET_COOKIE);
		for (String header : headers) {
			res.setHeader(HttpHeaders.SET_COOKIE, header + "; " + "SameSite=None; Secure");
		}
    }
    
    

}
