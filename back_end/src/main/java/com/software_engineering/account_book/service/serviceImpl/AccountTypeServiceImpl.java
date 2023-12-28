package com.software_engineering.account_book.service.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.software_engineering.account_book.entity.AccountType;
import com.software_engineering.account_book.mapper.AccountTypeMapper;
import com.software_engineering.account_book.service.AccountTypeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;

/**
 * @Classname AccountTypeServiceImpl
 * @Description TODO
 * @Date 2023/11/28 21:41
 * @Created by Lvjihong
 */
@Service
@Transactional
public class AccountTypeServiceImpl extends ServiceImpl<AccountTypeMapper, AccountType> implements AccountTypeService {
    @Override
    public String addAccountType(AccountType type) {
        AccountType result = baseMapper.selectOne(
                new QueryWrapper<AccountType>().eq("account_type_name", type.getAccountTypeName())
        );
        if (null == result) {
            getBaseMapper().insert(type);
            return  "添加类别成功！";
        }else{
            return "类别已存在！";
        }
    }

    @Override
    public LinkedList<AccountType> getAllAccountTypes() {
        return new LinkedList<>(baseMapper.selectList(null)) ;
    }

    @Override
    public String getAccountTypeIdByAccountTypeName(String name) {
        return null;
    }
}
