package com.kob.backend.consumer.utils;

import com.kob.backend.utils.JwtUtil;
import io.jsonwebtoken.Claims;

public class JwtAuthentication {
    //这里我们希望在外面可以直接用类名来进行调用，不希望用实例来调用。故用static
    public static Integer getUserId(String token) { //会返回一个 userId
        int userId = -1; //-1 表示不存在
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userId = Integer.parseInt(claims.getSubject());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return userId;
    }
}
