package com.software_engineering.account_book.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * @Classname User
 * @Description TODO
 * @Date 2023/10/31 14:30
 * @Created by Lvjihong
 */
@Data
@TableName("user")
public class User {
    @TableId(type = IdType.ASSIGN_UUID)  // 注册时使用UUID
            String userId;
    String userName;
    String wechatId;
    String password;
    String tel;
    String gender;
    String introduction;
    String headPortraitPath;
    String backgroundPath;
    int totalDate;
    int totalAmount;
    Date lastLoginDate;
    Date createDate;
    int consecutiveDateNum;
//    //由于这个属性不是 User 数据库表里的字段，因此需要添加 @TableField 注解，并将 exist 属性设置为 false。
//    @TableField(exist = false)
//    private List<Account> accounts;

}
