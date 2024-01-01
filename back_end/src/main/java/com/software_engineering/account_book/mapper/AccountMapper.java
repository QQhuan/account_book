package com.software_engineering.account_book.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.software_engineering.account_book.entity.Account;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Classname AccountMapper
 * @Description TODO
 * @Date 2023/12/25 19:07
 * @Created by Lvjihong
 */
@Mapper
public interface AccountMapper extends BaseMapper<Account> {
}