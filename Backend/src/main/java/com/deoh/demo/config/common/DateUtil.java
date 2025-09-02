package com.deoh.demo.config.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
    public static String DATE_SEP = "-";

    /**
     * Java.sql.date 형식의 Timestamp를 요청된 포맷으로 String형식으로 반환
     * @param timestamp
     * @param format
     * @return
     * example)
     * return DateUtil.timeStampToDate(this.insertTs, DateFormat.yyyy_MM_dd);
     */
    public static String timeStampToDate(Date date, DateFormat format) {

        if (date == null) {
            return null;
        }

        DateFormatConverter conv = new DateFormatConverter();
        String value = conv.convertToDatabaseColumn(format);

        return new SimpleDateFormat(value).format(date);
    }

    /**
     * 현재 Timestamp 조회
     * @return
     */
    public static Date currentTimeStamp() {
        return new Date();
    }

    /**
     * 년월일정보만 가지는 현재 날짜 조회
     * @return
     */
    public static Date currentDate() {
        return DateUtil.stringToDate(DateUtil.timeStampToDate(new Date(), DateFormat.yyyy_MM_dd), DateFormat.yyyy_MM_dd);
    }

    public static String currentDateYYYYMMDD() {
        return DateUtil.timeStampToDate(new Date(), DateFormat.yyyyMMdd);
    }

    /**
     * 날짜형식의 문자열을 날짜로 변경
     * @param strDate
     * @param format
     * @return
     * @throws ParseException
     */
    public static Date stringToDate(String strDate, DateFormat format) {
        DateFormatConverter conv = new DateFormatConverter();
        String value = conv.convertToDatabaseColumn(format);
        SimpleDateFormat transFormat = new SimpleDateFormat(value);

        try {
            return transFormat.parse(strDate);
        } catch (ParseException e) {
            return null;
        }
    }

}
