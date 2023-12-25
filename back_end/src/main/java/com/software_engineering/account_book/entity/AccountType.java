package com.software_engineering.account_book.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @Classname AccountType
 * @Description TODO
 * @Date 2023/11/16 9:41
 * @Created by Lvjihong
 */
@Data
@TableName("account_type")
public class AccountType {
    @TableId(type = IdType.ASSIGN_UUID)
    String accountTypeId;
    int incomeOrExpenditureType;
    String accountTypeName;
}
