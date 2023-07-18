package com.jasmine.mapper;

import com.jasmine.model.Contact;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ContactMapper {

    List<Contact> queryByUserId(@Param("userId") Integer userId,@Param("offset") Integer offset,@Param("limit") Integer limit);

    Contact queryByUserIdAndContactId(@Param("userId") Integer userId,@Param("contactId") Integer contactId);

    void insert(Contact contact);

    void delete(Integer userId, Integer contactId);

    void update(Contact contact);
}
