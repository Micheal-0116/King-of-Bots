package com.kob.backend.controller.user.bot;

import com.kob.backend.service.user.bot.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UpdateController {
    @Autowired
    private UpdateService updateService;

    @PostMapping("/user/bot/update/") //将所有的post请求映射过来,在这个用户目录下返回所有的post请求
    public Map<String, String> update(@RequestParam Map<String, String> data) {
        return updateService.update(data);
    }
}
