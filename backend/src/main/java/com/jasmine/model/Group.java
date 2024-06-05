package com.jasmine.model;

import java.io.Serializable;

/**
 * @author dcy
 * @version 1.0
 * @since 3/27/2024 9:16 AM
 */
public class Group implements Serializable {
    private Integer id;
    private String name;
    private Integer userId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
