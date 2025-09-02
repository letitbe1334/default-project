package com.deoh.demo.config.common;

public class CommonUtil {

    public static String snakeToCamel(String str) {
        // 첫 문자 대문자로 변경
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
  
        // Convert to StringBuilder
        StringBuilder builder = new StringBuilder(str);
  
        // snake_case >> camel_case
        for (int i = 0; i < builder.length(); i++) {
  
            // Check char is underscore
            if (builder.charAt(i) == '_') {
  
                builder.deleteCharAt(i);
                builder.replace(
                    i, i + 1,
                    String.valueOf(
                        Character.toUpperCase(
                            builder.charAt(i))));
            }
        }
  
        // Return in String type
        return builder.toString();
    }
    
}
