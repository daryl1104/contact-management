package com.jasmine.controller;

import com.jasmine.exception.CodeException;
import com.jasmine.model.Contact;
import com.jasmine.model.OperationResult;
import com.jasmine.service.IContactService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author 邓长英
 * @version 1.0
 * @date 2023/7/17 9:43 AM
 */
@RestController
@RequestMapping(value = "/contact")
public class ContactController {
    @Resource
    private IContactService contactService;

    @GetMapping("/lists")
    public Object lists(@RequestParam Integer userId,
                        @RequestParam(required = false, defaultValue = "0") Integer offset,
                        @RequestParam(required = false, defaultValue = "12") Integer limit) {

        return contactService.lists(userId, offset, limit);
    }

    @GetMapping("/get")
    public Object get(@RequestParam Integer userId,
                      @RequestParam("contact_id") Integer contactId) {
        return contactService.get(userId, contactId);
    }

    @PostMapping("/add")
    public Object add(@RequestParam Integer userId,
                      @RequestBody Contact contact) throws CodeException {
        contactService.add(userId, contact);
        return new OperationResult();
    }

    @GetMapping("/delete")
    public Object delete(@RequestParam Integer userId,
                         @RequestParam Integer contactId) {
        contactService.delete(userId, contactId);
        return new OperationResult();
    }

    @PostMapping("/update")
    public Object update(@RequestParam Integer userId,
                         @RequestBody Contact contact) {
        contactService.update(userId, contact);
        return new OperationResult();
    }
}
