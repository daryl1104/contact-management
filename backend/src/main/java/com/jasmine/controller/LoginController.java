package com.jasmine.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.jasmine.exception.CodeException;
import com.jasmine.model.OperationResult;
import com.jasmine.model.User;
import com.jasmine.service.ILoginService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 9:42 AM
 */
@RestController
@RequestMapping(value = "/user")
public class LoginController {
    @Resource
    private ILoginService loginService;

    @PostMapping(value = "/register")
    public Object register(@RequestBody JsonNode jsonNode) throws CodeException {
        String username = jsonNode.get("username").asText();
        String password = jsonNode.get("password").asText();
        loginService.register(username, password);

        return new OperationResult();
    }

    @GetMapping(value = "/login")
    public Object login(@RequestParam String username, @RequestParam String password, HttpServletRequest request, HttpServletResponse response) throws CodeException {
        User user = loginService.login(username, password);
        Cookie cookie = new Cookie("user", String.valueOf(user.getId()));
        cookie.setPath("/");
        response.addCookie(cookie);
        return user;
    }

    @GetMapping(value = "/logout")
    public Object logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length != 0) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().contains("user")) {
                    cookie.setValue("");
                    response.addCookie(cookie);
                }
            }
        }
        return new OperationResult();
    }

}
