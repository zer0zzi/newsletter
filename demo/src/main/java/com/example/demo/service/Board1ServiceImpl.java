package com.example.demo.service;

import com.example.demo.mapper.BoardMapper;
import com.example.demo.model.Board;
import com.example.demo.model.Group;
import com.example.demo.model.Subscriber;
import com.example.demo.repository.BoardRepository;
import com.example.demo.repository.GroupRepository1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Service
public class Board1ServiceImpl implements Board1Service {
    @Autowired
    private BoardRepository boardRepository;
    private GroupRepository1 groupRepository1;

    @Autowired
    private BoardMapper boardMapper;

    @Override
    public List<Board> getAllBoard() throws Exception {
        return boardMapper.getAllBoard();
    }

    @Override
    public Board createBoard(Board board, Map<String, Object> map, HttpServletRequest req) throws Exception {
        return boardRepository.save(board);
    }
    @Override
    public List<Group> getAllGroups() throws Exception {
        return boardMapper.getAllGroups();
    }

    public List<Map<String, Object>> getMember() throws Exception {
        return boardMapper.getMember();
    }

    // 영지 추가(3)
    public List<Map<String, Object>> group_print() throws Exception{
        return boardMapper.group_print();
    }

    public Subscriber subsinsert(Subscriber subscriber, Map<String, Object> map, HttpServletRequest req) throws Exception{
        return boardMapper.subsinsert(subscriber);
    }

    public Subscriber subsdelete(Integer id) throws Exception{
        return boardMapper.subsdelete(id);
    }

    public Subscriber subsupdate(Subscriber subscriber) throws Exception{
        System.out.println(subscriber);
        return boardMapper.subsupdate(subscriber);
    }

    public List<Map<String, Object>> getBoard(Integer id) throws Exception{
        return boardMapper.getBoard(id);
    }

    public List<Map<String, Object>> groupmana() throws Exception {
        return boardMapper.groupmana();
    }

    public Group groupinsert(Group group, Map<String, Object> map, HttpServletRequest req) throws Exception{
        return boardMapper.groupinsert(group);
    }

    public Group groupdelete(Integer group_code) throws Exception{
        return boardMapper.groupdelete(group_code);
    }

    public Group groupupdate(Group group) throws Exception{
        System.out.println(group);
        return boardMapper.groupupdate(group);
    }

    public List<Map<String, Object>> getGroup(Integer group_code) throws Exception{
        return boardMapper.getGroup(group_code);
    }

    public Subscriber excel_input(Subscriber subscriber, Map<String, Object> map, HttpServletRequest req) throws Exception{
        return boardMapper.excel_input(subscriber);
    }

    // 영지 추가(3) end


}
