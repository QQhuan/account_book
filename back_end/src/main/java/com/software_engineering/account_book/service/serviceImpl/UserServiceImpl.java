package com.software_engineering.account_book.service.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.software_engineering.account_book.entity.User;
import com.software_engineering.account_book.mapper.UserMapper;
import com.software_engineering.account_book.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.relation.RelationTypeSupport;
import java.text.SimpleDateFormat;
import java.util.Date;

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
    public int login(User user) {
        User result = baseMapper.selectOne(
                new QueryWrapper<User>().eq("tel", user.getTel())
        );
        if (null != result) {
            if (user.getPassword().equals(result.getPassword())) {
                return 200;
            } else {
                return 401;
            }
        } else {
            return 402;
        }
    }

    @Override
    public boolean register(User user) {
        User same = getUserByTel(user.getTel());
        if (null != same) {
            return false;
        } else {
            user.setCreateDate(new Date());
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
        return baseMapper.selectById(userId);
    }

    @Override
    public boolean update(User user) {
        int ret = baseMapper.updateById(user);
        if (ret == 1) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteByUserId(String userId) {
        int ret = baseMapper.deleteById(userId);
        if (ret == 1) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String addLoginDays(User user) {
        User result = baseMapper.selectOne(
                new QueryWrapper<User>().eq("tel", user.getTel())
        );
        if (null == result.getLastLoginDate()) {
            result.setTotalDate(1);
            result.setConsecutiveDateNum(1);
        } else {
            SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");
            if (!fmt.format(new Date()).equals(fmt.format(result.getLastLoginDate()))) {
                result.setTotalDate(result.getTotalDate() + 1);
            }
            Date yesterday = new Date(System.currentTimeMillis() - 1000 * 60 * 60 * 24);
            if (fmt.format(yesterday).equals(fmt.format(result.getLastLoginDate()))) {
                result.setConsecutiveDateNum(result.getConsecutiveDateNum() + 1);
            } else {
                result.setConsecutiveDateNum(1);
            }
        }
        result.setLastLoginDate(new Date());
        baseMapper.updateById(result);
        return result.getUserId();
    }

    @Override
    public void addTotalAmount(String userId) {
        User user = baseMapper.selectById(userId);
        user.setTotalAmount(user.getTotalAmount() + 1);
        baseMapper.updateById(user);
    }

    @Override
    public void deleteTotalAmount(String userId) {
        User user = baseMapper.selectById(userId);
        user.setTotalAmount(user.getTotalAmount() - 1);
        baseMapper.updateById(user);
    }
}
