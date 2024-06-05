package com.jasmine.mapper;

import com.jasmine.model.Group;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author dcy
 * @version 1.0
 * @since 5/25/2024 5:01 PM
 */
@Mapper
@Repository
public interface GroupMapper {
    Integer add(Group group);

    void delete(@Param("userId") Integer userId, @Param("groupId") Integer groupId);

//    assign(@Param("userId") Integer userId, @Param("contactId") Integer contactId, @Param("groupId") Integer groupId);

    List<Group> queryById(Integer userId);

}
