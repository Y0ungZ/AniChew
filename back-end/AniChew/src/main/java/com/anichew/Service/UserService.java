package com.anichew.Service;

import java.util.Map;

public interface UserService {
	void signUp(Map<String, Object> userInfo);
	boolean isNewUser(long id);
}
