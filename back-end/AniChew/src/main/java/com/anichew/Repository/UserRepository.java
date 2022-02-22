package com.anichew.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anichew.Entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
	Optional<User> findById(long id);

	List<User> findAllByNicknameContains(String keyword);

}
