package com.anichew.Configuration;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.anichew.Util.CookieUtil;
import com.anichew.Util.JwtUtil;
import com.anichew.Util.RedisUtil;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

	private static final Logger logger = LogManager.getLogger(JwtRequestFilter.class);

	private RequestMatcher requestMatcher = new AntPathRequestMatcher("/api/**");

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CookieUtil cookieUtil;

	@Autowired
	private RedisUtil redisUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			FilterChain filterChain) throws ServletException, IOException {
	
		
		
		final Cookie jwtToken = cookieUtil.getCookie(httpServletRequest, JwtUtil.ACCESS_TOKEN_NAME);
		final Cookie refreshTokenCookie = cookieUtil.getCookie(httpServletRequest, JwtUtil.REFRESH_TOKEN_NAME);
		String userid = null;
		String jwt = null;
		String refreshToken = null;
		String refreshUid = null;
		try {
			if(jwtToken!=null) {			
				jwt = jwtToken.getValue();
				userid = jwtUtil.getUserid(jwt);
			}
			if (userid != null) {
				if (!jwtUtil.validateToken(jwt, userid)) {
					httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				}

			}
		} catch (ExpiredJwtException e) {

			if (refreshTokenCookie != null) {

				refreshToken = refreshTokenCookie.getValue();
				refreshUid = jwtUtil.getUserid(refreshToken);
				
				if(!refreshToken.equals(redisUtil.getData(refreshUid))) {
					throw new ExpiredJwtException(null, null, "refresh token expired");
				}
				
				
				if (refreshToken!=null && jwtUtil.validateToken(refreshToken, refreshUid)) {											
					String newToken = jwtUtil.generateToken(refreshUid);
					Cookie accessTokenCookie = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, newToken, (int)jwtUtil.TOKEN_VALIDATION_SECOND);
					httpServletResponse.addCookie(accessTokenCookie);
					Collection<String> headers = httpServletResponse.getHeaders(HttpHeaders.SET_COOKIE);
					for (String header : headers) {
						httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, header + "; " + "SameSite=None; Secure");
					}
									
					throw new AccessTokenRefreshException("token refresh");
					
				} else {
					throw new ExpiredJwtException(null, null, "refresh token expired");
				}
			} else {
				throw new ExpiredJwtException(null, null, "access token expired");

			}

		} catch (Exception e) {
//			throw new JwtException("run time Exception", null);
		}
		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}
	



}
