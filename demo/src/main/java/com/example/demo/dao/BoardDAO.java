package com.example.demo.dao;

import com.example.demo.model.Group;
import org.springframework.stereotype.Repository;
import com.example.demo.dao.AbstractDAO;

import java.util.List;
import java.util.Map;

@Repository("boardDAO")
public class BoardDAO extends AbstractDAO {
    @SuppressWarnings("unchecked")
    public List<Group> getAllGroups() throws Exception {
        return (List<Group>) selectList("Board_SQL.getAllGroups");
    }
}
