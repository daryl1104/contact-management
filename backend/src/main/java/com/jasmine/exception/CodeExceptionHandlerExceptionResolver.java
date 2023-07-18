package com.jasmine.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 10:17 AM
 */
@Component
@Order(-100)
public class CodeExceptionHandlerExceptionResolver implements HandlerExceptionResolver {
    private Logger logger = LoggerFactory.getLogger(CodeExceptionHandlerExceptionResolver.class);

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

        logger.error("request exception: ", ex);

        ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
        modelAndView.addObject("timestamp", System.currentTimeMillis());
        modelAndView.addObject("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        if (ex instanceof CodeException) {
            modelAndView.addObject("error", ((CodeException) ex).getCode());
            modelAndView.addObject("msg", ((CodeException) ex).getMsg());

        } else {
            modelAndView.addObject("error", "500");
            modelAndView.addObject("msg", ex.getLocalizedMessage());

        }
        modelAndView.addObject("path", request.getRequestURI());

        modelAndView.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        return modelAndView;
    }
}
