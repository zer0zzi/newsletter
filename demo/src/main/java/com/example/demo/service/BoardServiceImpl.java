package com.example.demo.service;

import com.example.demo.model.Group;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Repository("Board_SQL")
public interface BoardServiceImpl {
    public List<Group> getGroup();
    //List<Map<String, Object>> getGroup(Map<String, Object>map) throws Exception;
}
