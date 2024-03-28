package com.kob.backend.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kob.backend.pojo.Bot;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BotMapper extends BaseMapper<Bot> { //BaseMapper 自动实现了增删改查

}
