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
import javax.xml.ws.Service;

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

    /**
     * 电话号登录
     *
     * @param temp user的json
     * @return 登录结果
     */
    @PostMapping("/login")
    public String login(@RequestBody String temp) {
        User user = new User();
        user.setTel(temp.split(" ")[0]);
        user.setPassword(temp.split(" ")[1]);
        int code = userService.login(user);
        if (code == 200) {
            return userService.addLoginDays(user);
        } else if (code == 401) {
            return "密码错误";
        } else {
            // code == 402
            return "账户不存在";
        }
    }

    /**
     * 微信登录
     *
     * @param openId 用户的openId
     * @return 登录结果
     */
    @PostMapping("/login_by_wechat")
    public String loginByWechat(@RequestBody String openId) {
        String userId = userService.loginByWechat(openId);
        return userId;
    }

    /**
     * 注册
     *
     * @param temp 注册信息
     * @return 注册结果
     */
    @PostMapping("/register")
    public String register(@RequestBody String temp) {
        User user = gson.fromJson(temp, User.class);
        if (userService.register(user)) {
            return "注册成功！";
        } else {
            return "注册失败！";
        }
    }

    /**
     * 通过用户id得到用户信息
     *
     * @param userId 用户id
     * @return 用户信息
     */
    @PostMapping("/get_user_by_id")
    public String getUserById(@RequestBody String userId) {
        return gson.toJson(userService.getUserByUserId(userId));
    }

    /**
     * 用户更新
     *
     * @param temp 更新的用户信息
     * @return 更新结果
     */
    @PostMapping("/update")
    public String update(@RequestBody String temp) {
        User user = gson.fromJson(temp, User.class);
        if (userService.update(user)) {
            return "更改信息成功！";
        } else {
            return "更改信息失败！";
        }
    }

    /**
     * 删除用户
     *
     * @param userId 用户id
     * @return 删除的结果
     */
    @PostMapping("/delete")
    public String deleteByUserId(@RequestBody String userId) {
        if (userService.deleteByUserId(userId)) {
            return "删除成功！";
        } else {
            return "删除失败！";
        }
    }
}
