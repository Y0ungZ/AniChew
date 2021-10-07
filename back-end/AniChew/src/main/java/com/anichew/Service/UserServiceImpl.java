package com.anichew.Service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

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
import com.anichew.Request.CoverRequest;
import com.anichew.Request.UserRequest;
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

	public void signUp(Map<String, Object> userInfo) {
		UserDTO userDTO = new UserDTO();

		long id = Long.parseLong((String) userInfo.get("id"));
		userDTO.setId(id);
		userDTO.setEmail((String) userInfo.getOrDefault("email", null));
		String nickname = "";
		String nicknamePrefix[] = { "고독한", "즐거운", "용감한", "활발한", "냉정한", "장난꾸러기", "무시무시한", "화려한", "미스테리한", "사랑스러운" };
		String nicknameSuffix[] = { "손바닥", "발바닥", "치킨마요", "고추참치", "냥이", "댕댕이", "전문가", "아마추어", "오톡이", "고로케" };

		int prefixIdx = LocalDateTime.now().getSecond() % 10;
		int suffixIdx = Math.abs((LocalDateTime.now().getSecond() * (int) (id % 10))) % 10;
		nickname = nicknamePrefix[prefixIdx] + " " + nicknameSuffix[suffixIdx];
		User user = User.builder().id(id).email((String) userInfo.getOrDefault("email", null)).status(UserStatus.MEMBER)
				.gender(UserGender.NONE).nickname(nickname).birthday(null).createdDate(LocalDateTime.now()).build();

		userRepo.save(user);

	}

	public boolean existsUser(long id) {

		if (userRepo.existsById(id))
			return false;

		return true;
	}
	
	
	

	public String generateToken(HttpServletRequest httpServletReq, HttpServletResponse httpServletResponse, String userid) {

		final String accessToken = jwtUtil.generateToken(userid);
		final String refreshToken = jwtUtil.generateRefreshToken(userid);
		Cookie accessTokenCookie = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, accessToken,(int)jwtUtil.TOKEN_VALIDATION_SECOND);
		
		httpServletResponse.addCookie(accessTokenCookie);
		Collection<String> headers = httpServletResponse.getHeaders(HttpHeaders.SET_COOKIE);
		for (String header : headers) {
			httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, header + "; " + "SameSite=None; Secure");
		}


		return accessToken;
	}
	
	
	public boolean generateRefreshToken(HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);		
		final String refreshToken = jwtUtil.generateRefreshToken(Long.toString(userid));
		
			
		Cookie refreshTokenCookie = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME,refreshToken,(int)jwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
		redisUtil.setDataExpire(userid + "jwt", refreshToken, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);	
		httpServletRes.addCookie(refreshTokenCookie);
		Collection<String> headers = httpServletRes.getHeaders(HttpHeaders.SET_COOKIE);
		for (String header : headers) {
			httpServletRes.setHeader(HttpHeaders.SET_COOKIE, header + "; " + "SameSite=None; Secure");
		}
		
		redisUtil.setData(Long.toString(userid),refreshToken);

		return true;
	}
	

	public MyInfoResponse getMyInfo(HttpServletRequest httpServletReq) {
		long accessor = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(accessor);	
		
		
		
		MyInfoResponse myInfo = new MyInfoResponse();
		myInfo.setUserId(user.getId());
		myInfo.setNickname(user.getNickname());
		myInfo.setEmail(user.getEmail());
		myInfo.setAvatar(user.getAvatar());
		myInfo.setGender(user.getGender());
		myInfo.setStatus(user.getStatus());
		myInfo.setBirthday(user.getBirthday());
		myInfo.setCover(user.getCover());

		return myInfo;
	}

	@Override
	public UserPageResponse userPage(HttpServletRequest httpServletReq, long userid) {

		User user = userRepo.findById(userid);
		UserPageResponse response = new UserPageResponse();
		
		long accessor = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		
		if (userid == accessor)
			response.setMine(true);

		response.setEmail(user.getEmail());
		response.setAvatar(user.getAvatar());
		response.setNickname(user.getNickname());
		response.setUserid(user.getId());
		response.setCover(user.getCover());
		

		List<FavoriteAnimeResponse> fAnimes = new ArrayList();
		List<FavoriteCharaResponse> fCharas = new ArrayList();
		List<FavoriteSeiyuResponse> fSeiyus = new ArrayList();

		for (FavoriteAnime fa : user.getFavoriteAnimes()) {
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

		for (FavoriteChara fc : user.getFavoriteCharas()) {
			FavoriteCharaResponse fcResponse = new FavoriteCharaResponse();
			Chara chara = fc.getChara();
			fcResponse.setId(chara.getId());
			fcResponse.setFirstName(chara.getFirstName());
			fcResponse.setLastName(chara.getLastName());
			fCharas.add(fcResponse);

		}

		for (FavoriteSeiyu fs : user.getFavoriteSeiyus()) {
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

	@Override
	public void logout(HttpServletRequest httpServletReq, HttpServletResponse httpServletRes) {
		String userid = Long.toString(cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME));
		String data = userid.concat("jwt");
		
		HttpSession session = httpServletReq.getSession();
		session.invalidate();
		
		boolean deleted = redisUtil.deleteData(data);
		cookieUtil.deleteCookie(httpServletReq, httpServletRes, jwtUtil.ACCESS_TOKEN_NAME);
		
	}

	@Override
	public MyInfoResponse setUserInfo(HttpServletRequest httpServletReq, UserRequest req) {

		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);

		User user = userRepo.findById(userid);

		User fixedUser = User.builder()
				.id(user.getId())
				.email(user.getEmail())
				.status(user.getStatus())
				.gender(req.getGender())
				.nickname(req.getNickname())
				.avatar(req.getAvatar())
				.birthday(LocalDate.parse(req.getBirthday().substring(0,10)))
				.createdDate(user.getCreatedDate())
				.cover(user.getCover())
				.build();

		userRepo.save(fixedUser);
		
		MyInfoResponse response = new MyInfoResponse();
		response.setAvatar(fixedUser.getAvatar());
		response.setBirthday(fixedUser.getBirthday());
		response.setEmail(fixedUser.getEmail());
		response.setGender(fixedUser.getGender());
		response.setUserId(fixedUser.getId());
		response.setStatus(fixedUser.getStatus());
		response.setNickname(fixedUser.getNickname());
		
		
		
		return response;

	}

	
	
	
	@Override
	public boolean checkToken(HttpServletRequest httpServletReq) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);

		if (userid == cookieUtil.USER_NULL)
			return false;

		return true;
	}

	@Override
	public String uploadPhoto(MultipartFile mpf, HttpServletRequest httpServletReq) {
		
		
		UUID uid = UUID.randomUUID();
		String absolutePath = new File("").getAbsolutePath() + File.separator;
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
				
		User user = userRepo.findById(userid);
		
		String path = "src" +  File.separator + "main" +  File.separator + "resources" +  File.separator + "anichew-image" + File.separator + "user_imgs" + File.separator + userid;
		File file = new File(path);

		if (!file.exists()) {
			file.mkdirs();
		}		
		
		
		String originalFileExtension;
		String contentType = mpf.getContentType();		
		
		
		if (ObjectUtils.isEmpty(contentType)) {
			return null;
		}


		if (contentType.contains("image/jpeg")) {
			originalFileExtension = ".jpg";
		} else if (contentType.contains("image/png")) {
			originalFileExtension = ".png";
		} else {

			return null;
		}
		
		String filename = uid.toString() + originalFileExtension;

		file = new File(absolutePath + path + File.separator + filename);
		file.setWritable(true);
		file.setReadable(true);
		try {
			mpf.transferTo(file);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			System.out.println(file.getCanonicalPath());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return filename;		
		
	
	}

	@Override
	public boolean setAvatar(String avatar, HttpServletRequest httpServletReq) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid);
		
		
		User fixedUser = User.builder()
				.id(user.getId())
				.email(user.getEmail())
				.status(user.getStatus())
				.gender(user.getGender())
				.nickname(user.getNickname())
				.birthday(user.getBirthday())
				.createdDate(user.getCreatedDate())
				.cover(user.getCover())
				.avatar(avatar)
				.build();

		userRepo.save(fixedUser);
		
		
		return true;
	}

	@Override
	public boolean setCover(HttpServletRequest httpServletReq, CoverRequest req) {
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid);

		User fixedUser = User.builder()
				.id(user.getId())
				.email(user.getEmail())
				.status(user.getStatus())
				.gender(user.getGender())
				.nickname(user.getNickname())
				.avatar(user.getAvatar())
				.birthday(user.getBirthday())
				.createdDate(user.getCreatedDate())
				.cover(req.getCover())
				.build();

		userRepo.save(fixedUser);
		
		MyInfoResponse response = new MyInfoResponse();
		response.setAvatar(fixedUser.getAvatar());
		response.setBirthday(fixedUser.getBirthday());
		response.setEmail(fixedUser.getEmail());
		response.setGender(fixedUser.getGender());
		response.setUserId(fixedUser.getId());
		response.setStatus(fixedUser.getStatus());
		response.setNickname(fixedUser.getNickname());
		
		
		
		return true;
	}
	
	@Override
	public boolean deleteCover(HttpServletRequest httpServletReq) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid);
		
		
		if(user == null)
			return false;
		
		
		user = User.builder()
				.id(user.getId())
				.email(user.getEmail())
				.status(user.getStatus())
				.gender(user.getGender())
				.nickname(user.getNickname())
				.avatar(user.getAvatar())
				.birthday(user.getBirthday())
				.createdDate(user.getCreatedDate())
				.cover(null)
				.build();
		
		userRepo.save(user);
		
		return true;
	}
	
	@Override
	public boolean deleteAvatar(HttpServletRequest httpServletReq) {
		
		long userid = cookieUtil.getUserid(httpServletReq, jwtUtil, jwtUtil.ACCESS_TOKEN_NAME);
		User user = userRepo.findById(userid);
		
		if(user == null)
			return false;
		
		user = User.builder()
				.id(user.getId())
				.email(user.getEmail())
				.status(user.getStatus())
				.gender(user.getGender())
				.nickname(user.getNickname())
				.avatar(null)
				.birthday(user.getBirthday())
				.createdDate(user.getCreatedDate())
				.cover(user.getCover())
				.build();
		
		userRepo.save(user);
		
		
		return true;
	}


	

}
