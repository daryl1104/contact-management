package com.jasmine.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 3:35 PM
 */
public class Contact implements Serializable {
    private Integer id;
    private String name;
    @JsonProperty("phone_number")
    private String phoneNumber;
    private String wechat;
    private String qq;
    private String email;
    private String address;
    private Integer gender;
    private Integer userId;


    public Contact() {
    }

    public Contact(Integer id, String name, String phoneNumber, String wechat, String qq, String email, String address, Integer gender, Integer userId) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.wechat = wechat;
        this.qq = qq;
        this.email = email;
        this.address = address;
        this.gender = gender;
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getWechat() {
        return wechat;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }
}
