package com.example.demo.service;

import com.example.demo.model.Board;
import com.example.demo.model.Group;
import com.example.demo.repository.BoardRepository;
import com.example.demo.repository.GroupRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.swing.*;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Service("BoardService")
public class BoardService  {

    Logger log = Logger.getLogger(String.valueOf(this.getClass()));
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private GroupRepository groupRepository;

    @Resource(name = "fileUtils")
    private FileUtils1 fileUtils;

    // get boards data
    public List<Board> getAllBoard() {
        return boardRepository.findAll();
    }

    //create board
    public Board createBoard(Board board, Map<String, Object>map, HttpServletRequest req) throws Exception {
        //BoardService.this.mailStart(map, req);
        return boardRepository.save(board);
    }

    //public List<Group> getAllGroups() { return groupRepository.findGroupByGroupCodeAndGroup_title(2, "으하하"); }
    public List<Group> getAllGroups() {
        //return groupRepository.findGroupMember(2, "dd", "dd");}
        return groupRepository.findGroupByGroupCodeAndGroup_title(0, "0");}
    //Mail 전송
    /*public String mailStart(Board board, Map<String, Object> map, HttpServletRequest req) throws Exception {
        JSONObject obj = new JSONObject();
        try{
            HttpSession session = req.getSession();
            map.putAll((HashMap) session.getAttribute("board"));
            String Sender = (String)map.get("member_no");
            String Reciver = (String)map.get("member_rev");
            String Content = (String)map.get("contents");
            String Title= (String)map.get("title");
            System.out.println(Title);
            new Send_Mail(Sender, Reciver, Content, Title).Send_News_Mail();
            obj.put("msg", "메일이 전송되었습니다.");
        } catch (Exception e) {
            obj.put("msg", "메일 전송 오류!");
        }
        return obj.toJSONString();
    }*/
    public String mailStart(Board board2, Map<String, Object> map, HttpServletRequest req) throws Exception {
        JSONObject obj = new JSONObject();
        //String filePath = req.getSession().getServletContext().getRealPath("/files/temp");
        //ArrayList<Map<String, Object>> user_list = new ArrayList<>();
        try {
            String Sender = board2.getMemberNo();
            String Reciver = board2.getMember_rev();
            String Content = "[보낸 사람 : " + board2.getMemberNo() + "]<script><br><br><br></script>" + board2.getContents();
            String Title = board2.getTitle();
            String File_id = board2.getFile_id();
            new Send_Mail(Sender, Reciver, Content, Title, File_id).Send_News_Mail();
            obj.put("msg", "메일이 전송되었습니다.");
        } catch (Exception e) {
            obj.put("msg", "죄송합니다. 실패하였습니다.");
        }
        return obj.toJSONString();
    }
}
