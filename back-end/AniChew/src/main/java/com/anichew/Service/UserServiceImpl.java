package com.anichew.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.anichew.DTO.UserDTO;
import com.anichew.Entity.Anime;
import com.anichew.Entity.Chara;
import com.anichew.Entity.FavoriteAnime;
import com.anichew.Entity.FavoriteChara;
import com.anichew.Entity.FavoriteSeiyu;
import com.anichew.Entity.Seiyu;
import com.anichew.Entity.User;
import com.anichew.Entity.UserGender;
import com.anichew.Entity.UserStatus;
import com.anichew.Repository.UserRepository;
import com.anichew.Response.FavoriteAnimeResponse;
import com.anichew.Response.FavoriteCharaResponse;
import com.anichew.Response.FavoriteSeiyuResponse;
import com.anichew.Response.MyInfoResponse;
import com.anichew.Response.UserPageResponse;
import com.anichew.Util.CookieUtil;
import com.anichew.Util.JwtUtil;
import com.anichew.Util.RedisUtil;

@Service
public class UserServiceImpl implements UserService {
	

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CookieUtil cookieUtil;
	
	@Autowired
	private RedisUtil redisUtil;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	public boolean isExistUser(long userid) {
		return userRepo.existsById(userid);
	}
	
	
	public void signUp(Map<String,Object> userInfo) {
		UserDTO userDTO = new UserDTO();
		
		
		long id = Long.parseLong((String)userInfo.get("id"));
		userDTO.setId(id);
		userDTO.setEmail((String)userInfo.getOrDefault("email", null));		
		String nickname ="";		
		String nicknamePrefix[] = {"고독한","즐거운","용감한","활발한", "냉정한", "장난꾸러기", "무시무시한", "화려한", "미스테리한", "사랑스러운"};
		String nicknameSuffix[] = {"손바닥", "발바닥", "치킨마요", "고추참치", "냥이" ,"댕댕이", "전문가", "아마추어", "오톡이", "고로케" };
		
		
		
		int prefixIdx = LocalDateTime.now().getSecond() % 10;
		int suffixIdx = Math.abs((LocalDateTime.now().getSecond()*(int)(id%10)))%10;
		nickname = nicknamePrefix[prefixIdx] +nicknameSuffix[suffixIdx];
		User user = User.builder()
				.id(id)
				.email((String)userInfo.getOrDefault("email", null))
				.status(UserStatus.MEMBER)				
				.gender(UserGender.NONE)
				.nickname(nickname)
				.birthday(LocalDate.now())
				.createdDate(LocalDateTime.now())
				.build();
		
		userRepo.save(user);
		
	}
	
	public boolean isNewUser(long id) {		
		
		if(userRepo.existsById(id))
			return false;
		
		return true;
	}
	
	public boolean generateToken(HttpServletResponse httpServletResponse, String userid) {
		
		final String accessToken = jwtUtil.generateToken(userid);
		final String refreshToken = jwtUtil.generateRefreshToken(userid);
		Cookie accessTokenCookie = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, accessToken);
		redisUtil.setDataExpire(userid+"jwt", refreshToken, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
		httpServletResponse.addCookie(accessTokenCookie);

		
		Collection<String> headers = httpServletResponse.getHeaders(HttpHeaders.SET_COOKIE);
		for (String header : headers) {
			httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, header+"; " + "SameSite=None; Secure");
		}
		
		System.out.println(accessToken);
		
		return true;
	}
	
	public MyInfoResponse getMyInfo(HttpServletRequest httpServletReq) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String accessor = jwtUtil.getUserid(requestTokenHeader);
		User user = userRepo.findById(Long.parseLong(accessor));
		
		MyInfoResponse myInfo = new MyInfoResponse();
		myInfo.setNickname(user.getNickname());
		myInfo.setEmail(user.getEmail());
		myInfo.setAvtar(user.getAvatar());
		
		
		return myInfo;
	}

	@Override
	public UserPageResponse userPage(HttpServletRequest httpServletReq, long userid) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String accessor = jwtUtil.getUserid(requestTokenHeader);
								
		User user = userRepo.findById(userid);
		
		UserPageResponse response = new UserPageResponse();
		
		if(userid == Long.parseLong(accessor))
			response.setMine(true);
		
		response.setEmail(user.getEmail());
		response.setAvatar(user.getAvatar());
		response.setNickname(user.getNickname());
		response.setUserid(user.getId());
		
		
		List<FavoriteAnimeResponse> fAnimes = new ArrayList();
		List<FavoriteCharaResponse> fCharas = new ArrayList();
		List<FavoriteSeiyuResponse> fSeiyus = new ArrayList();
	
		for(FavoriteAnime fa : user.getFavoriteAnimes()) {
			FavoriteAnimeResponse faResponse = new FavoriteAnimeResponse();
			Anime anime = fa.getAnime();
			faResponse.setId(anime.getId());
			faResponse.setName(anime.getName());
			faResponse.setEnglishName(anime.getEnglishName());
			faResponse.setJapanseName(anime.getJapaneseName());
			faResponse.setKoreanName(anime.getKoreanName());
			faResponse.setSeason(anime.getSeason());
			faResponse.setType(anime.getType());
			fAnimes.add(faResponse);
		}
		
		for(FavoriteChara fc : user.getFavoriteCharas()) {
			FavoriteCharaResponse fcResponse = new FavoriteCharaResponse();
			Chara chara = fc.getChara();
			fcResponse.setId(chara.getId());
			fcResponse.setFirstName(chara.getFirstName());
			fcResponse.setLastName(chara.getLastName());
			fCharas.add(fcResponse);
			
		}
		
		for(FavoriteSeiyu fs : user.getFavoriteSeiyus()) {
			FavoriteSeiyuResponse fsResponse = new FavoriteSeiyuResponse();
			Seiyu seiyu = fs.getSeiyu();
			fsResponse.setId(seiyu.getId());
			fsResponse.setName(seiyu.getName());
			fSeiyus.add(fsResponse);
		}
		
		response.setFavoriteAnimes(fAnimes);
		response.setFavoriteCharas(fCharas);
		response.setFavoriteSeiyus(fSeiyus);
		
		
		
		return response;
	}
	
}
