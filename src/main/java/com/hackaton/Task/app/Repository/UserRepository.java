package com.hackaton.Task.app.Repository;
import com.hackaton.Task.app.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String>{
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findByName(String username);

    User findByEmail(String email);

}
