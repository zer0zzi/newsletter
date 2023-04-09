package com.example.demo.service;

import com.example.demo.model.Board;
import com.example.demo.model.Group;
import com.example.demo.model.Subscriber;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.Map;


public interface Board1Service {


    List<Board> getAllBoard() throws Exception;

    Board createBoard(Board board, Map<String, Object> map, HttpServletRequest req) throws Exception;

    List<Group> getAllGroups() throws Exception;

    List<Map<String, Object>> getMember() throws Exception;

    // 영지 추가(2)
    List<Map<String, Object>> group_print() throws Exception;

    Subscriber subsinsert(Subscriber subscriber, Map<String, Object> map, HttpServletRequest req) throws Exception;

    Subscriber subsdelete(Integer id) throws Exception;

    Subscriber subsupdate(Subscriber subscriber) throws Exception;

    List<Map<String, Object>> getBoard(Integer id) throws Exception;

    List<Map<String, Object>> groupmana() throws Exception;

    Group groupinsert(Group group, Map<String, Object> map, HttpServletRequest req) throws Exception;

    Group groupdelete(Integer group_code) throws Exception;

    Group groupupdate(Group group) throws Exception;

    List<Map<String, Object>> getGroup(Integer group_code) throws Exception;

    Subscriber excel_input(Subscriber subscriber, Map<String, Object> map, HttpServletRequest req) throws Exception;
    // 영지 추가(2) end
}
