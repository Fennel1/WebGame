package com.web.mapper;

import com.web.pojo.UserInfo;

import java.util.List;

public interface UserMapper {
    List<UserInfo> selectAll();

    UserInfo selectByName(String name);

    void add(UserInfo userInfo);
}
