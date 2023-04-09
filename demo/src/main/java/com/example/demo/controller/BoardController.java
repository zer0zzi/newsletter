package com.example.demo.controller;

import com.example.demo.model.Board;

import com.example.demo.model.Group;
import com.example.demo.model.Subscriber;
import com.example.demo.service.BoardService;
import com.example.demo.service.Board1Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BoardController {
    Logger log = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private BoardService boardService;
    @Autowired
    private Board1Service boardService1;


    // get all board
    @RequestMapping("/board")
    public List<Board> getAllBoards() throws Exception {
        log.debug("board");
        return boardService1.getAllBoard();
    }

    @RequestMapping("/createBoard")
    public Board createBoard(@RequestBody Board board, Map<String, Object> map, HttpServletRequest req) throws Exception {
        return boardService1.createBoard(board, map, req);
    }

    @PostMapping("/create-board")
    public String mailStart(@RequestBody Board board2, Map<String, Object>map, HttpServletRequest req) throws Exception {
        System.out.println(board2.getTitle());
        return boardService.mailStart(board2, map, req);
    }

    /*@RequestMapping("/create-board")
    public List<Group> getAllGroups() throws Exception {
        log.debug("create-board");
        return boardService.getAllGroups();
    }*/

    @RequestMapping("/create-board") //20210628 이윤희 멤버조회
    public List<Map<String, Object>> getMember() throws Exception {
        return boardService1.getMember();
    }
    /*@RequestMapping(value = "/create-board")
    public ModelAndView getGroup(HttpServletRequest req) throws Exception {
        ModelAndView mv = new ModelAndView("/craete-board");
        Map<String, Object> map = new HashMap<>();
        mv.addObject("getGroup", boardServiceImpl.getGroup(map));
        return mv;
    }*/

    // 영지 추가(1)
    @RequestMapping("/group")
    public List<Map<String, Object>> group_print() throws Exception {
        return boardService1.group_print();
    }

    @PostMapping("/group")
    public Subscriber subsinsert(@RequestBody Subscriber subscriber, Map<String, Object>map, HttpServletRequest req) throws Exception {
        return boardService1.subsinsert(subscriber,map, req);
    }

    @DeleteMapping("/group/{id}")
    public Subscriber subsdelete(@PathVariable Integer id) throws Exception {
        return boardService1.subsdelete(id);
    }

    @PutMapping("/group/{id}")
    public Subscriber subsupdate(@RequestBody Subscriber subscriber) throws Exception {
        return boardService1.subsupdate(subscriber);
    }

    @GetMapping("/group/{id}")
    public List<Map<String, Object>> getBoardById(@PathVariable Integer id) throws Exception {
        return boardService1.getBoard(id);
    }

    @RequestMapping("/groupmana")
    public List<Map<String, Object>> groupmana() throws Exception {
        return boardService1.groupmana();
    }

    @PostMapping("/groupmana")
    public Group groupinsert(@RequestBody Group group, Map<String, Object>map, HttpServletRequest req) throws Exception {
        return boardService1.groupinsert( group, map, req);
    }

    @DeleteMapping("/groupmana/{group_code}")
    public Group groupdelete(@PathVariable Integer group_code) throws Exception {
        return boardService1.groupdelete(group_code);
    }

    @PutMapping("/groupmana/{group_code}")
    public Group groupupdate(@RequestBody Group group) throws Exception {
        return boardService1.groupupdate(group);
    }

    @GetMapping("/groupmana/{group_code}")
    public List<Map<String, Object>> getBoardByGroupcode(@PathVariable Integer group_code) throws Exception {
        return boardService1.getGroup(group_code);
    }

    @PostMapping("/groupexcel")
    public Subscriber excelinput(@RequestBody Subscriber subscriber, Map<String, Object>map, HttpServletRequest req) throws Exception {
        return boardService1.excel_input(subscriber,map, req);
    }

    // 영지 추가(1) end

}