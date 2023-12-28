package com.software_engineering.account_book.service;

import com.software_engineering.account_book.entity.AccountType;

import java.util.LinkedList;

/**
 * @Classname AccountTypeService
 * @Description TODO
 * @Date 2023/11/28 21:41
 * @Created by Lvjihong
 */

public interface AccountTypeService  {

    /**
     * 添加账单类别
     * @param type
     * @return 添加成功或者添加失败
     */
     String addAccountType(AccountType type);

    /**
     * 查询所有账单类型
     * @return 账单类型的列表
     */
     LinkedList<AccountType> getAllAccountTypes();

    /**
     * 通过账单名称查找账单类别id
     * @param name
     * @return 账单类别的id
     */
    String getAccountTypeIdByAccountTypeName(String name);
}
