package com.jasmine.service.impl;

import com.jasmine.mapper.GroupMapper;
import com.jasmine.model.Group;
import com.jasmine.service.IGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author dcy
 * @version 1.0
 * @since 5/24/2024 6:31 PM
 */
@Service
public class GroupServiceImpl implements IGroupService {
    @Autowired
    private GroupMapper groupMapper;

    @Override
    public void add(Integer userId, String groupName) {
        Group group = new Group();
        group.setName(groupName);
        group.setUserId(userId);
        groupMapper.add(group);
    }

    @Override
    public List<Group> list(Integer userId) {
        return groupMapper.queryById(userId);
    }

    @Override
    public void assign(Integer userId, Integer groupId, Integer contactId) {

    }

    @Override
    public void delete(Integer userId, Integer groupId) {
        groupMapper.delete(userId, groupId);
    }
}
