package com.software_engineering.account_book.controller;

import com.google.gson.Gson;
import com.software_engineering.account_book.entity.Account;
import com.software_engineering.account_book.entity.AccountType;
import com.software_engineering.account_book.service.AccountService;
import com.software_engineering.account_book.utils.StatisticalData;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Classname AccountController
 * @Description TODO
 * @Date 2023/12/25 19:06
 * @Created by Lvjihong
 */
@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService service;
    @Resource
    private Gson gson;
    @PostMapping("/add")
    public String addAccount(@RequestBody String temp) {
        Account account = gson.fromJson(temp, Account.class);
        return service.addAccount(account);
    }
    @PostMapping("/update")
    public String updateAccount(@RequestBody String temp) {
        Account account = gson.fromJson(temp, Account.class);
        return service.updateAccount(account);
    }
    @PostMapping("/delete")
    public String deleteAccount(@RequestBody String accountId) {
        return service.deleteAccount(accountId);
    }
    @PostMapping("/get_all")
    public String getAllAccounts(@RequestBody String userId) {
        List<Account> list = service.getAllAccounts(userId);
        return gson.toJson(list);
    }

    @PostMapping("/get_by_year")
    public String getAccountsByYear(@RequestBody String info) {
        String userId = info.split(" ")[0];
        String year = info.split(" ")[1];
        List<Account> list = service.getAccountByYear(userId,year);
        return gson.toJson(list);
    }

    @PostMapping("/get_by_month")
    public String getAccountsByMonth(@RequestBody String info) {
        String userId = info.split(" ")[0];
        String year = info.split(" ")[1];
        String month = info.split(" ")[2];
        String inOrOut = info.split(" ")[3];
        StatisticalData ret = service.getAccountsByMonth(userId,year,month,inOrOut);
        return gson.toJson(ret);
    }
}
