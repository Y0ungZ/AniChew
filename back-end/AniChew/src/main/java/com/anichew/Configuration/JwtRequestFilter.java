package com.anichew.Configuration;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.anichew.Util.CookieUtil;
import com.anichew.Util.JwtUtil;
import com.anichew.Util.RedisUtil;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

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

		
		System.out.println("필터 입장");
		
		final Cookie jwtToken = cookieUtil.getCookie(httpServletRequest, JwtUtil.ACCESS_TOKEN_NAME);
		Cookie refreshToken = cookieUtil.getCookie(httpServletRequest, JwtUtil.REFRESH_TOKEN_NAME);
		String userid = null;
		String jwt = null;
		String refreshJwt = null;
		String refreshUid = null;

		try {
			if(jwtToken!=null) {			
				jwt = jwtToken.getValue();			
				userid = jwtUtil.getUserid(jwt);
			}
			System.out.println(userid);
			if (userid != null) {
				if (!jwtUtil.validateToken(jwt, userid)) {
					httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				}

			}
		} catch (ExpiredJwtException e) {
			System.out.println(userid);
			String redisData = null;
			if (refreshToken != null) {
				refreshJwt = refreshToken.getValue();
			}

			if (refreshJwt != null) {

				refreshUid = jwtUtil.getUserid(refreshJwt);
				redisData = redisUtil.getData(userid + "jwt");

				if (refreshJwt.equals(redisData)) {
					String newToken = jwtUtil.generateToken(refreshUid);
					Cookie accessTokenCookie = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, newToken);
					httpServletResponse.addCookie(accessTokenCookie);

					Collection<String> headers = httpServletResponse.getHeaders(HttpHeaders.SET_COOKIE);
					for (String header : headers) {
						httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, header + "; " + "SameSite=None; Secure");
					}

				} else {
					throw new ExpiredJwtException(null, null, "refresh token expired");
				}
			} else {
				throw new ExpiredJwtException(null, null, "access token expired");

			}

		} catch (Exception e) {
//			throw new JwtException("run time Exception", null);
		}
		System.out.println("요긴가");
		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}

}
