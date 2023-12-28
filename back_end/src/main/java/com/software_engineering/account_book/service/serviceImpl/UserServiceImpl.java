package com.software_engineering.account_book.service.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.software_engineering.account_book.entity.User;
import com.software_engineering.account_book.mapper.UserMapper;
import com.software_engineering.account_book.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Classname UserServiceImpl
 * @Description TODO
 * @Date 2023/10/31 14:31
 * @Created by Lvjihong
 */
@Service
@Transactional
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Override
    public String login(User user) {
        User result = baseMapper.selectOne(
                new QueryWrapper<User>().eq("tel", user.getTel())
        );
        if (null != result) {
            if (user.getPassword().equals(result.getPassword())) {
                return result.getUserId();
            }else {

                return "密码错误！";
            }
        }else{
            return "账号未注册！";
        }
    }

    @Override
    public boolean register(User user) {
        User same = getUserByTel(user.getTel());
        if (null != same) {
            return false;
        } else {
            getBaseMapper().insert(user);
            return true;
        }
    }

    @Override
    public User modifyInformation(User user) {
        return null;
    }

    @Override
    public User getUserByTel(String tel) {
        return baseMapper.selectOne(
                new QueryWrapper<User>().eq("tel", tel)
        );
    }

    @Override
    public User getUserByUserId(String userId) {
        return null;
    }
}
