package com.jasmine.service;

import com.jasmine.exception.CodeException;
import com.jasmine.model.User;

public interface ILoginService {
    void register(String username, String password) throws CodeException;

    User login(String username, String password) throws CodeException;
}
