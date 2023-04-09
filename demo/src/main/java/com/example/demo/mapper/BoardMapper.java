package com.example.demo.mapper;

import com.example.demo.model.Board;
import com.example.demo.model.Group;
import com.example.demo.model.Subscriber;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface BoardMapper {
    List<Board> getAllBoard() throws Exception;

    Board createBoard(Board board) throws Exception;

    List<Group> getAllGroups() throws Exception;

    List<Map<String, Object>> getMember() throws Exception;

    // 영지 추가(4)
    List<Map<String, Object>> group_print() throws Exception;

    Subscriber subsinsert(Subscriber subscriber) throws Exception;

    Subscriber subsdelete(Integer id) throws Exception;

    Subscriber subsupdate(Subscriber subscriber) throws Exception;

    List<Map<String, Object>> getBoard(Integer id) throws Exception;

    List<Map<String, Object>> groupmana() throws Exception;

    Group groupinsert(Group group) throws Exception;

    Group groupdelete(Integer group_code) throws Exception;

    Group groupupdate(Group group) throws Exception;

    List<Map<String, Object>> getGroup(Integer group_code) throws Exception;

    Subscriber excel_input(Subscriber subscriber) throws Exception;
    // 영지 추가(4) end
}
