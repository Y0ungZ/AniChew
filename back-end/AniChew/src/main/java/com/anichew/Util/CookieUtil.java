package com.anichew.Util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CookieUtil {
	 public final static long USER_NULL = -1;	
		
    public Cookie createCookie(String cookieName, String value){
        Cookie token = new Cookie(cookieName,value);
        token.setHttpOnly(true);
        token.setMaxAge((int)JwtUtil.TOKEN_VALIDATION_SECOND/100);
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
    

}
