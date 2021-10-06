package com.anichew.Configuration;


import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.anichew.Util.CookieUtil;
import com.anichew.Util.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ExceptionHanlderFilter extends OncePerRequestFilter {

	private Logger log = LoggerFactory.getLogger(this.getClass());	

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CookieUtil cookieUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException, JwtException {

		try {
			filterChain.doFilter(request, response);
		}
		catch (ExpiredJwtException ex) {
			log.error("expired exception doesn't have access token");
			setErrorResponse(HttpStatus.UNAUTHORIZED, response, "access token expired");
			cookieUtil.deleteCookie(request, response, jwtUtil.ACCESS_TOKEN_NAME);

		}catch(AccessTokenRefreshException ex) {
			setErrorResponse(HttpStatus.FORBIDDEN, response, "access token refresh");
		}		
		catch (RuntimeException ex) {
			log.error("runtime exception exception handler filter");			
			setErrorResponse(HttpStatus.FORBIDDEN, response, "runtime exception occurred");
			cookieUtil.deleteCookie(request, response, jwtUtil.ACCESS_TOKEN_NAME);
		}
	}

	public void setErrorResponse(HttpStatus status, HttpServletResponse response, String errorMsg) {
		response.setStatus(status.value());
		response.setContentType("application/json");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
		response.setHeader("Access-Control-Expose-Headers","Content-Disposition, X-AUTH-TOKEN, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Credentials");
		
		try {
			response.getWriter().write(errorMsg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
