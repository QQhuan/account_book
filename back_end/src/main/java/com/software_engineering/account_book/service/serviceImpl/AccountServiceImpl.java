package com.software_engineering.account_book.service.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.software_engineering.account_book.entity.Account;
import com.software_engineering.account_book.mapper.AccountMapper;
import com.software_engineering.account_book.service.AccountService;
import com.software_engineering.account_book.utils.StatisticalData;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Classname AccountServiceImpl
 * @Description TODO
 * @Date 2023/12/25 19:15
 * @Created by Lvjihong
 */
@Service
@Transactional
public class AccountServiceImpl extends ServiceImpl<AccountMapper, Account> implements AccountService {

    @Override
    public int addAccount(Account account) {
        return getBaseMapper().insert(account);
    }

    @Override
    public String updateAccount(Account account) {
        baseMapper.updateById(account);
        return "修改成功";
    }

    @Override
    public int deleteAccount(String accountId) {
        Account result = baseMapper.selectById(accountId);
        if (null == result) {
            return 0;
        } else {
            return baseMapper.deleteById(accountId);
        }
    }

    @Override
    public List<Account> getAllAccounts(String userId) {
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("user_id", userId);
        return baseMapper.selectList(wrapper);
    }

    @Override
    public StatisticalData getAccountByYear(String userId, String year,String inOrOut) {
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.apply(" date_format(record_time,'%Y') = " + year + "");
        wrapper.eq("user_id", userId);
        wrapper.eq("income_or_expenditure_type", inOrOut);
        StatisticalData data = new StatisticalData();
        List<Account> result = baseMapper.selectList(wrapper);
        if (result.size() > 0) {
            Map<String, Double> mapByType = new HashMap<>();
            Map<String, Double> mapByTime = new HashMap<>();
            for (Account account : result) {
                String typeName = account.getAccountTypeName();
                Double amountByType = mapByType.get(typeName);
                if (null == amountByType) {
                    mapByType.put(typeName, account.getAmount());
                } else {
                    mapByType.put(typeName, account.getAmount() + amountByType);
                }
                Date date = account.getRecordTime();
                String month=new SimpleDateFormat("MMMM").format(date);
                Double amountByDate = mapByTime.get(month);
                if (null == amountByDate) {
                    mapByTime.put(month, account.getAmount());
                } else {
                    mapByTime.put(month, account.getAmount() + amountByDate);
                }
            }
            data.setType(mapByType);
            data.setTime(mapByTime);

        }
        return data;
    }

    @Override
    public StatisticalData getAccountsByMonth(String userId, String year, String month, String inOrOut) {
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.apply(" date_format(record_time,'%Y') = " + year + "");
        wrapper.apply(" date_format(record_time,'%m') = " + month + "");
        wrapper.eq("user_id", userId);
        wrapper.eq("income_or_expenditure_type", inOrOut);
        List<Account> result = baseMapper.selectList(wrapper);
        StatisticalData data = new StatisticalData();
        if (result.size() > 0) {
            Map<String, Double> mapByType = new HashMap<>();
            Map<String, Double> mapByTime = new HashMap<>();
            for (Account account : result) {
                String typeName = account.getAccountTypeName();
                Double amountByType = mapByType.get(typeName);
                if (null == amountByType) {
                    mapByType.put(typeName, account.getAmount());
                } else {
                    mapByType.put(typeName, account.getAmount() + amountByType);
                }
                Date date = account.getRecordTime();
                Double amountByDate = mapByTime.get(date.toString());
                if (null == amountByDate) {
                    mapByTime.put(date.toString(), account.getAmount());
                } else {
                    mapByTime.put(date.toString(), account.getAmount() + amountByDate);
                }
            }
            data.setType(mapByType);
            data.setTime(mapByTime);
        }
        return data;
    }

    @Override
    public String getUserIdByAccountId(String accountId) {
        return baseMapper.selectById(accountId).getUserId();
    }

}
