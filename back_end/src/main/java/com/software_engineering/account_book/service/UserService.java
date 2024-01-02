package com.software_engineering.account_book.service;

import com.software_engineering.account_book.entity.User;

/**
 * @Classname UserService
 * @Description TODO
 * @Date 2023/10/31 14:31
 * @Created by Lvjihong
 */
public interface UserService {
    /**
     * 登录
     *
     * @param user
     * @return 登录成功返回200，密码错误401，用户不存在402
     */
    int login(User user);

    /**
     * 注册
     *
     * @param user
     * @return 是否注册成功
     */
    boolean register(User user);

    /**
     * 修改用户信息
     *
     * @param user
     * @return 修改成功返回当前注册信息，修改失败返回null
     */
    User modifyInformation(User user);

    /**
     * 通过用户手机号获取用户信息
     *
     * @param tel
     * @return
     */
    User getUserByTel(String tel);

    /**
     * 通过用户Id返回用户信息
     * @param userId
     * @return
     */
    User getUserByUserId(String userId);

    boolean update(User user);

    boolean deleteByUserId(String userId);

    String addLoginDays(User user);

    void addTotalAmount(String userId);

    void deleteTotalAmount(String userId);
}
