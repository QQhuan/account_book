package com.software_engineering.account_book.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

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
     int totalDate;
     int totalAmount;
}
