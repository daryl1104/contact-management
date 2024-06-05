package com.jasmine.service;

import com.jasmine.model.Group;

import java.util.List;

/**
 * @author dcy
 * @version 1.0
 * @since 5/24/2024 6:30 PM
 */
public interface IGroupService {
    void add(Integer userId, String groupName);

    List<Group> list(Integer userId);

    void assign(Integer userId, Integer groupId, Integer contactId);

    void delete(Integer userId, Integer groupId);
}
