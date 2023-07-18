package com.jasmine.exception;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 10:12 AM
 */
public class CodeException extends Exception {
    private String code;
    private String msg;

    public CodeException() {
        super();
        this.code = "500";
        this.msg = "Runtime Exception.";
    }

    public CodeException(String code, String msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }

    public CodeException(String message, String code, String msg) {
        super(message);
        this.code = code;
        this.msg = msg;
    }

    public CodeException(String message, Throwable cause, String code, String msg) {
        super(message, cause);
        this.code = code;
        this.msg = msg;
    }

    public CodeException(Throwable cause, String code, String msg) {
        super(cause);
        this.code = code;
        this.msg = msg;
    }

    public CodeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, String code, String msg) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
