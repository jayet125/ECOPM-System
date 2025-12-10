package edu.ecopm.service;


import edu.ecopm.entity.User;
import edu.ecopm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userrepository;


    public void register(User user) {
        if (userrepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("用户已存在");
        }
        userrepository.save(user);
    }


    public boolean login(String username, String password) {
        User user = userrepository.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public List<User> getAllUser() {
        return userrepository.findAll();
    }

    public User getUserById(Integer id) {
        return userrepository.findById(id).orElse(null);
    }


}
