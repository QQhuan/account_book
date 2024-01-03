package com.software_engineering.account_book.controller;

import com.google.gson.Gson;
import com.software_engineering.account_book.entity.Account;
import com.software_engineering.account_book.service.AccountService;
import com.software_engineering.account_book.service.UserService;
import com.software_engineering.account_book.utils.StatisticalData;
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
    private AccountService accountService;

    @Autowired
    private UserService userService;
    @Resource
    private Gson gson;

    /**
     * 增加记账
     *
     * @param temp 账目信息
     * @return 增加结果
     */
    @PostMapping("/add")
    public String addAccount(@RequestBody String temp) {
        Account account = gson.fromJson(temp, Account.class);
        int ret = accountService.addAccount(account);
        if (ret == 1) {
            userService.addTotalAmount(account.getUserId());
            return "记账成功";
        } else {

            return "记账失败";
        }
    }

    /**
     * 更新账目
     *
     * @param temp 更新后账目信息
     * @return 更新结果
     */
    @PostMapping("/update")
    public String updateAccount(@RequestBody String temp) {
        Account account = gson.fromJson(temp, Account.class);
        return accountService.updateAccount(account);
    }

    /**
     * 删除账目
     *
     * @param accountId 要删除的账目id
     * @return 删除结果
     */
    @PostMapping("/delete")
    public String deleteAccount(@RequestBody String accountId) {
        String userId = accountService.getUserIdByAccountId(accountId);
        int ret = accountService.deleteAccount(accountId);
        if (ret == 1) {
            userService.deleteTotalAmount(userId);
            return "删除成功";
        } else {
            return "删除失败";
        }
    }

    /**
     * 获取所有账目信息
     *
     * @param userId 用户id
     * @return 该用户所有账目
     */
    @PostMapping("/get_all")
    public String getAllAccounts(@RequestBody String userId) {
        List<Account> list = accountService.getAllAccounts(userId);
        return gson.toJson(list);
    }

    /**
     * 通过年份查找报表统计
     *
     * @param info 用户id和请求的年份以及收支类型
     * @return 所有符合条件的账目内容
     */
    @PostMapping("/get_by_year")
    public String getAccountsByYear(@RequestBody String info) {
        String userId = info.split(" ")[0];
        String year = info.split(" ")[1];
        String inOrOut = info.split(" ")[2];
        StatisticalData data = accountService.getAccountByYear(userId, year, inOrOut);
        return gson.toJson(data);
    }

    /**
     * 通过月份查找报表统计
     *
     * @param info 用户id和请求的月份以及收支类型
     * @return 所有符合条件的账目内容
     */
    @PostMapping("/get_by_month")
    public String getAccountsByMonth(@RequestBody String info) {
        String userId = info.split(" ")[0];
        String year = info.split(" ")[1];
        String month = info.split(" ")[2];
        String inOrOut = info.split(" ")[3];
        StatisticalData ret = accountService.getAccountsByMonth(userId, year, month, inOrOut);
        return gson.toJson(ret);
    }
}
