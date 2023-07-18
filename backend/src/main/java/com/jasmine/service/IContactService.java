package com.jasmine.service;

import com.jasmine.exception.CodeException;
import com.jasmine.model.Contact;

import java.util.List;

public interface IContactService {
    List<Contact> lists(Integer userId, Integer offset, Integer limit);

    Contact get(Integer userId, Integer contactId);

    void add(Integer userId, Contact contact) throws CodeException;

    void delete(Integer userId, Integer contactId);

    void update(Integer userId, Contact contact);
}
