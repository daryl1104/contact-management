package com.jasmine.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.jasmine.exception.CodeException;
import com.jasmine.model.OperationResult;
import com.jasmine.model.User;
import com.jasmine.service.ILoginService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;

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
//        Cookie cookie = new Cookie("user", String.valueOf(user.getId()));
//        cookie.setPath("/");
//        cookie.setDomain("localhost.com");
//        cookie.setMaxAge(999999999);
//        response.addCookie(cookie);
        // Building cookies
        ResponseCookie cookie = ResponseCookie.from("user", String.valueOf(user.getId())) // key & value
                .httpOnly(false)
                .secure(false)
                    .domain("localhost")  // host
                    .path("/")      // path
                .maxAge(Duration.ofHours(1))
                .sameSite("Lax")  // sameSite

                .build()
                ;

        // Response to the client
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return user;
    }



}
