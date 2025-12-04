package edu.ecopm.controller;

import edu.ecopm.entity.User;
import edu.ecopm.service.Userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private Userservice userService;

    @PostMapping("/register")
    public String register(@RequestBody User user){
        try {
            userService.register(user);
            return "注册成功";

        }catch(Exception e){
            return "注册失败"+e.getMessage();
        }

    }

    @PostMapping("/login")
    public String login(@RequestParam String username,@RequestParam String password  ){
        if (userService.login(username,password)){
            return "登录成功";
        }else {
            return "登录失败";
        }

    }
    @GetMapping("/getUser")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @GetMapping("/getUserById")
    public User getUserById(@RequestParam Integer id){
        return userService.getUserById(id);
    }
}
