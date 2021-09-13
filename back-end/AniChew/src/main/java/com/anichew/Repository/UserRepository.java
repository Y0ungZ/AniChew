package com.anichew.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
	
}
