package com.anichew.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
	User findById(long id);
	List<User> findAllByNicknameContains(String keyword);
}
