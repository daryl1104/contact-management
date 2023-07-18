package com.jasmine.service.impl;

import com.jasmine.exception.CodeException;
import com.jasmine.mapper.UserMapper;
import com.jasmine.model.User;
import com.jasmine.service.ILoginService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 10:29 AM
 */
@Service
public class LoginServiceImpl implements ILoginService {
    @Resource
    private UserMapper userMapper;

    @Override
    public void register(String username, String password) throws CodeException {
        if (userMapper.query(username, null) != null) {
            throw new CodeException("500", "username exists.");
        }

        User newUser = new User(username, password);
        userMapper.insert(newUser);
    }

    @Override
    public User login(String username, String password) throws CodeException {
        User user = userMapper.query(username, password);
        if (user != null) {
            // 登录成功
            return user;
        } else {
            throw new CodeException("500", "账号不存在或者密码错误.");

        }
    }
}
