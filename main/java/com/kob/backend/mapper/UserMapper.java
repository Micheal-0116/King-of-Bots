package com.kob.backend.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kob.backend.pojo.User;
import org.apache.ibatis.annotations.Mapper;

//一个表对应一个pojo 对应一个Mapper
//我们这个mybatisplus帮我们做了很多工作，自动为我们写了很多sql语句，要不得手写
@Mapper
public interface UserMapper extends BaseMapper<User> { //BaseMapper 自动实现了增删改查

}
