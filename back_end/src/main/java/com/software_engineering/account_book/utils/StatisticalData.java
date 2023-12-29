package com.software_engineering.account_book.utils;

import lombok.Data;

import java.util.Map;

/**
 * @Classname StatisticalData
 * @Description TODO
 * @Date 2023/12/27 14:20
 * @Created by Lvjihong
 */
@Data
public class StatisticalData {
    Map<String, Double> time;
    Map<String, Double> type;
}
