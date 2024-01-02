package com.software_engineering.account_book.service;

import com.software_engineering.account_book.entity.Account;
import com.software_engineering.account_book.utils.StatisticalData;

import java.util.List;

/**
 * @Classname AcountService
 * @Description TODO
 * @Date 2023/12/25 19:14
 * @Created by Lvjihong
 */
public interface AccountService {
    int addAccount(Account account);

    String updateAccount(Account account);

    int deleteAccount(String accountId);

    List<Account> getAllAccounts(String userId);

    StatisticalData getAccountByYear(String userId, String year, String inOrOut);

    StatisticalData getAccountsByMonth(String userId, String year, String month, String inOrOut);

    String getUserIdByAccountId(String accountId);
}
