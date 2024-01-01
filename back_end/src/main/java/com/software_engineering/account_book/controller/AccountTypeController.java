package com.software_engineering.account_book.controller;

import com.google.gson.Gson;
import com.software_engineering.account_book.entity.AccountType;
import com.software_engineering.account_book.service.AccountTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.LinkedList;

/**
 * @Classname AccountTypeController
 * @Description TODO
 * @Date 2023/11/28 21:39
 * @Created by Lvjihong
 */
@RestController
@RequestMapping("/account_type")
public class AccountTypeController {
    @Autowired
    private AccountTypeService accountTypeService;
    @Resource
    private Gson gson;

    @PostMapping("/add")
    public String addAccountType(@RequestBody String temp) {
        AccountType type = gson.fromJson(temp, AccountType.class);
        return accountTypeService.addAccountType(type);
    }

    @PostMapping("/get_all")
    public String getAllAccountTypes() {
        LinkedList<AccountType> list = accountTypeService.getAllAccountTypes();
        return gson.toJson(list);
    }

    @PostMapping("/delete")
    public String deleteAccountType(@RequestBody String typeId) {
        if (accountTypeService.deleteAccountType(typeId)) {
            return "删除成功！";
        } else {
            return "删除失败！";
        }
    }

    @PostMapping("/update")
    public String updateAccountType(@RequestBody String tmp) {
        AccountType type = gson.fromJson(tmp, AccountType.class);
        if (accountTypeService.updateAccountType(type)) {
            return "更新成功！";
        } else {
            return "更新失败！";
        }
    }
}
