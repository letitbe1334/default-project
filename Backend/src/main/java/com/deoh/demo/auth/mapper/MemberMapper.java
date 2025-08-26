package com.deoh.demo.auth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.repository.query.Param;

import com.deoh.demo.auth.entity.Member;

@Mapper
public interface MemberMapper {

    // XML 파일에 정의된 <select id="findAll"> 태그의 SQL과 연결
    List<Member> findAll();

    // XML 파일에 정의된 <select id="findById"> 태그의 SQL과 연결
    Member findById(Long id);

    // XML 파일을 거치지 않고 직접 쿼리 작성 (간단한 쿼리에 유용)
    @Select("SELECT * FROM members WHERE username = #{username}")
    Member findByUsername(@Param("username") String username);

    // XML 파일에 정의된 <insert id="insert"> 태그의 SQL과 연결
    void insert(Member member);

    // XML 파일에 정의된 <update id="update"> 태그의 SQL과 연결
    void update(Member member);

    // XML 파일에 정의된 <delete id="delete"> 태그의 SQL과 연결
    void delete(Long id);

}
