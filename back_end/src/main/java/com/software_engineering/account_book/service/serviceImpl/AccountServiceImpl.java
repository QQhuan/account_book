package com.software_engineering.account_book.service.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.software_engineering.account_book.entity.Account;
import com.software_engineering.account_book.mapper.AccountMapper;
import com.software_engineering.account_book.service.AccountService;
import com.software_engineering.account_book.utils.StatisticalData;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public String addAccount(Account account) {

        getBaseMapper().insert(account);
        return "记账成功";
    }

    @Override
    public String updateAccount(Account account) {
        baseMapper.updateById(account);
        return "修改成功";
    }

    @Override
    public String deleteAccount(String accountId) {
        Account result = baseMapper.selectById(accountId);
        if (null == result) {
            return "查无此条！";
        } else {
            baseMapper.deleteById(accountId);
            return "删除成功！";
        }
    }

    @Override
    public List<Account> getAllAccounts(String userId) {
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("user_id", userId);
        return baseMapper.selectList(wrapper);
    }

    @Override
    public List<Account> getAccountByYear(String userId, String year) {
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.apply(" date_format(record_time,'%Y') = " + year + "");
        wrapper.eq("user_id", userId);
        return baseMapper.selectList(wrapper);
    }

    @Override
    public StatisticalData getAccountsByMonth(String userId, String year, String month, String in_or_out) {
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.apply(" date_format(record_time,'%Y') = " + year + "");
        wrapper.apply(" date_format(record_time,'%m') = " + month + "");
        wrapper.eq("user_id", userId);
        wrapper.eq("income_or_expenditure_type", in_or_out);
        List<Account> result = baseMapper.selectList(wrapper);
        StatisticalData data = new StatisticalData();
        if (result.size() <= 0) {

        } else {

            Map<String, Double> type = new HashMap<>();
            Map<String, Double> time = new HashMap<>();
            for (Account account : result) {

                type[account.getAccountTypeId()];

                Double typeDouble;
                if(null == type){
                    typeDouble = new Double(account.getAmount()) ;
                }else{
                    typeDouble = new Double(type.get(account.getAccountTypeId())) ;
                }

                typeDouble = typeDouble.doubleValue() + account.getAmount();
                type.put(account.getAccountTypeId(), typeDouble);

                Date date = account.getRecordTime();
                String dayTmp = String.format("%td", date);
                Double timeDouble = new Double(time.get(dayTmp));
                timeDouble = timeDouble.doubleValue() + account.getAmount();
                time.put(dayTmp, timeDouble);

            }
            List<Map<String, Double>> thisMonth = new LinkedList<>();
            thisMonth.add(time);
            data.setTime(thisMonth);

            List<Map<String, Double>> types = new LinkedList<>();
            types.add(type);
            data.setType(types);
        }
        return data;

    }

}
