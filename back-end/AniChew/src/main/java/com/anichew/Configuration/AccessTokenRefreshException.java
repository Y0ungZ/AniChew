package com.anichew.Configuration;

public class AccessTokenRefreshException extends RuntimeException {
	public AccessTokenRefreshException() {}
	
	
	public AccessTokenRefreshException(String msg){
		super(msg);
	}
}
