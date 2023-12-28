package com.software_engineering.account_book.utils;

import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.zip.DeflaterOutputStream;

/**
 * @Classname StatisticalData
 * @Description TODO
 * @Date 2023/12/27 14:20
 * @Created by Lvjihong
 */
@Data
public class StatisticalData {
    List<Map<String,Double>> time;
    List<Map<String, Double>> type;
}
