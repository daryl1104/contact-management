package com.jasmine.controller;

import com.jasmine.model.OperationResult;
import com.jasmine.service.IGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 邓长英
 * @version 1.0
 * @since 5/24/2024 6:28 PM
 */
@RestController
@RequestMapping("/group")
public class CGroupController {
    @Autowired
    private IGroupService groupService;

    @GetMapping("/add")
    public Object add(@RequestParam Integer userId,
                      @RequestParam String groupName) {
        groupService.add(userId, groupName);
        return new OperationResult();
    }

    @GetMapping("/list")
    public Object list(@RequestParam Integer userId) {
        return groupService.list(userId);
    }

//    @GetMapping("/assign")
//    public Object assign(@RequestParam Integer userId,
//                         @RequestParam Integer groupId,
//                         @RequestParam Integer contactId) {
//        groupService.assign(userId, groupId, contactId);
//        return new OperationResult();
//    }

    @GetMapping("/delete")
    public Object delete(@RequestParam Integer userId,
                         @RequestParam Integer groupId) {
        groupService.delete(userId, groupId);
        return new OperationResult();
    }


}
