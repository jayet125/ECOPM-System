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
    private UserRepository userRepository;


    public void register(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("用户名已存在");
        }

        // 检查邮箱是否已存在
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("邮箱已被注册");
        }

        // 检查手机号是否已存在
        if (userRepository.findByPhone(user.getPhone()) != null) {
            throw new RuntimeException("手机号已被注册");
        }

        // 保存用户信息
        userRepository.save(user);
    }



    public boolean login(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }


}
