package com.software_engineering.account_book.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.software_engineering.account_book.entity.User;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;

/**
 * @Classname UserMapper
 * @Description TODO
 * @Date 2023/10/31 14:30
 * @Created by Lvjihong
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}