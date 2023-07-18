package com.jasmine.service.impl;

import com.jasmine.exception.CodeException;
import com.jasmine.mapper.ContactMapper;
import com.jasmine.model.Contact;
import com.jasmine.service.IContactService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 3:36 PM
 */
@Service
public class ContactServiceImpl implements IContactService {
    @Resource
    private ContactMapper contactMapper;

    @Override
    public List<Contact> lists(Integer userId, Integer offset, Integer limit) {
        return contactMapper.queryByUserId(userId, offset, limit);
    }

    @Override
    public Contact get(Integer userId, Integer contactId) {
        Contact contact = contactMapper.queryByUserIdAndContactId(userId, contactId);
        return contact;
    }

    @Override
    public void add(Integer userId, Contact contact) throws CodeException {
        contact.setUserId(userId);
        contactMapper.insert(contact);
    }

    @Override
    public void delete(Integer userId, Integer contactId) {
        contactMapper.delete(userId, contactId);
    }

    @Override
    public void update(Integer userId, Contact contact) {
        Contact contact1 = contactMapper.queryByUserIdAndContactId(userId, contact.getId());
        if (contact1 == null) {
            return;
        }
        contact.setUserId(userId);
        contactMapper.update(contact);
    }
}
