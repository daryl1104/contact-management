//package com.jasmine.filter;
//
//import org.springframework.stereotype.Component;
//import org.springframework.util.StringUtils;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * @author 邓长英
// * @version 1.0
// * @date 2023/7/17 11:33 AM
// */
//@Component
//public class LoginInterceptor implements HandlerInterceptor {
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        if (request.getRequestURI().contains("user")) {
//            return true;
//        }
//
//        Cookie[] cookies = request.getCookies();
//        if (cookies == null || cookies.length == 0) {
//            return false;
//        }
//
//        for (Cookie cookie : cookies) {
//            if (cookie.getName().contains("user")) {
//                if (!StringUtils.isEmpty(cookie.getValue())){
//                    // add request param
//                    request.getParameter()
//                    return true;
//                }
//                return false;
//            }
//        }
//
//        return false;
//    }
//
//}
