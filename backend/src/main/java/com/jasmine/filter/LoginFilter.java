package com.jasmine.filter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeCreator;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.jasmine.exception.CodeException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 2:31 PM
 */
@Component
public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        if (request.getRequestURI().contains("user")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        Cookie[] cookies = request.getCookies();
        if (cookies == null || cookies.length == 0) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json;charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode objectNode = objectMapper.createObjectNode();
            objectNode.put("status","500");
            objectNode.put("msg","未登录");
            response.getWriter().append(objectMapper.writeValueAsString(objectNode));
            return;
        }

        for (Cookie cookie : cookies) {
            if (cookie.getName().contains("user")) {
                if (!StringUtils.isEmpty(cookie.getValue())) {
                    // add request param
                    Map<String, String[]> extraMap = new HashMap<>();
                    extraMap.put("userId", new String[]{cookie.getValue()});
                    CustomRequestParamWrapper requestParamWrapper = new CustomRequestParamWrapper(request, extraMap);

                    filterChain.doFilter(requestParamWrapper, servletResponse);
                    return;
                }
                return;
            }
        }

    }

    @Override
    public void destroy() {

    }
}
