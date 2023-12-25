package com.software_engineering.account_book.controller;

import com.google.gson.Gson;
import com.software_engineering.account_book.entity.User;
import com.software_engineering.account_book.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Classname UserController
 * @Description TODO
 * @Date 2023/10/31 14:29
 * @Created by Lvjihong
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Resource
    private Gson gson;
    @PostMapping("/login")
    public String login(@RequestBody String temp) {
        User user = new User();
        user.setTel(temp.split(" ")[0]);
        user.setPassword(temp.split(" ")[1]);
        return userService.login(user);
    }
    @PostMapping("/register")
    public String register(@RequestBody String temp) {
        User user = gson.fromJson(temp, User.class);
        if (userService.register(user)) {
            return "注册成功！";
        } else {
            return "注册失败！";
        }
    }
}
