package com.software_engineering.account_book.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

/**
 * @author Lvjihong
 * @Classname Account
 * @Description TODO
 * @Date 2023/11/16 9:40
 */
@Data
@TableName("user")
public class Account {
    @TableId(type = IdType.ASSIGN_UUID)
    String accountId;
    int incomeOrExpenditureType;
    String accountTypeId;
    double amount;
    Date recordTime;
    String detail;
    String accountBookId;

}
