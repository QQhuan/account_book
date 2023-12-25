package com.software_engineering.account_book.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sun.tools.corba.se.idl.StringGen;
import lombok.Data;

import java.util.Date;

/**
 * @author Lvjihong
 * @Classname AccountBook
 * @Description TODO
 * @Date 2023/11/16 9:41
 * @Created by Lvjihong
 */
@Data
@TableName("account_book")
public class AccountBook {
    String userId;
    String accountBookId;
    String accountBookName;
    Date accountBookCreateTime;
}
