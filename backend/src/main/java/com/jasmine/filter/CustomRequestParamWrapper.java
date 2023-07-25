package com.jasmine.filter;

import org.apache.tomcat.util.http.fileupload.IOUtils;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.*;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 2:42 PM
 */
public class CustomRequestParamWrapper extends HttpServletRequestWrapper {
    private Map<String, String[]> params = new HashMap<>();
    private HttpServletRequest request;
    private byte[] requestBody;


    public CustomRequestParamWrapper(HttpServletRequest request) {
        super(request);
        this.request = request;
        this.params.putAll(request.getParameterMap());
    }

    public CustomRequestParamWrapper(HttpServletRequest request, Map<String, String[]> extraMap) {
        this(request);
        this.request = request;
        addAllParam(extraMap);
        addRequestBody();
    }

    private void addRequestBody() {
        try {
            if (this.request.getInputStream() != null) {
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                IOUtils.copy(request.getInputStream(), baos);
                this.requestBody = baos.toByteArray();
            }
        } catch (IOException e) {
            //
        }
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
//        if (this.requestBody == null) {
//            ByteArrayOutputStream baos = new ByteArrayOutputStream();
//            IOUtils.copy(request.getInputStream(), baos);
//            this.requestBody = baos.toByteArray();
//        }
        ByteArrayInputStream bais = new ByteArrayInputStream(this.requestBody);
        return new ServletInputStream() {
            @Override
            public boolean isFinished() {
                return false;
            }

            @Override
            public boolean isReady() {
                return false;
            }

            @Override
            public void setReadListener(ReadListener readListener) {

            }

            @Override
            public int read() throws IOException {
                return bais.read();
            }
        };
    }

    @Override
    public BufferedReader getReader() throws IOException {
        return new BufferedReader(new InputStreamReader(this.getInputStream()));
    }

    @Override
    public String getParameter(String name) {
        String[] strings = this.params.get(name);
        if (strings == null || strings.length == 0) {
            return null;
        }
        return strings[0];
    }

    @Override
    public Map<String, String[]> getParameterMap() {
        return this.params;
    }

    @Override
    public Enumeration<String> getParameterNames() {
        return new Vector<>(this.params.keySet()).elements();
    }

    @Override
    public String[] getParameterValues(String name) {
        String[] strings = this.params.get(name);
        if (strings == null || strings.length == 0) {
            return null;
        }
        return strings;
    }

    private void addAllParam(Map<String, String[]> extraMap) {
        for (Map.Entry<String, String[]> entry : extraMap.entrySet()) {
            addParam(entry.getKey(), entry.getValue());
        }
    }

    private void addParam(String key, Object value) {
        if (value != null) {
            if (value instanceof String) {
                this.params.put(key, new String[]{(String) value});
            } else if (value instanceof String[]) {
                this.params.put(key, (String[]) value);
            } else {
                this.params.put(key, new String[]{String.valueOf(value)});
            }
        }
    }

}
