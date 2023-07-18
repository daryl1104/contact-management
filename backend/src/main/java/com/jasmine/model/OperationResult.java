package com.jasmine.model;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 10:24 AM
 */
public class OperationResult {
    private boolean success;
    private String message;

    public OperationResult(String... messages) {
        if (messages != null && messages.length != 0) {
            this.success = false;
            this.message = messages[0];
        } else {
            this.success = true;
        }
    }

    public OperationResult(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
