package com.jasmine.mapper;

import com.jasmine.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserMapper {
    User query(@Param("username") String username,@Param("password") String password);

    Integer insert(User user);

}
