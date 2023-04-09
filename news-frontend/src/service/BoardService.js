import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8181/api/board"; 
const BOARD_SEND_MAIL = "http://localhost:8181/api/create-board";
const GROUP_LIST = "http://localhost:8181/api/group";
const BOARD_INSERT_BOARD = "http://localhost:8181/api/createBoard";
const GROUP_MANA = "http://localhost:8181/api/groupmana";

class BoardService {

    getBoards() {  // 리스트 조회
        return axios.get(BOARD_API_BASE_URL)
    }

    createBoard(board) {  // 뉴스레터 작성
        return axios.post(BOARD_INSERT_BOARD, board);
    }

    mailStart(board2) {  // 메일 전송
        return axios.post(BOARD_SEND_MAIL, board2);
    }

    getGroups() {  // 멤버 조회
        return axios.get(BOARD_SEND_MAIL);
    }

    // 영지 추가(1)
    getgroup() { // 주소록 목록
        return axios.get(GROUP_LIST);
    }

    subsinsert(group) { //주소록 추가
        return axios.post(GROUP_LIST, group);
    }

    subsdelete(id) { // 주소록 삭제
        return axios.delete(GROUP_LIST+"/"+id);
    }

    subsupdate(id,chsubs) { // 주소록 수정
        return axios.put(GROUP_LIST+"/"+id,chsubs);
    }

    getOneBoard(id) {
        return axios.get(GROUP_LIST+"/"+id);
    }

    groupmana(){ // 그룹 목록
        return axios.get(GROUP_MANA);
    }

    groupinsert(groupmana) { // 그룹 추가
        return axios.post(GROUP_MANA, groupmana);
    }

    groupdelete(group_code) { // 그룹 삭제
        return axios.delete(GROUP_MANA+"/"+group_code);
    }

    groupupdate(group_code,chgroup){
        return axios.put(GROUP_MANA+"/"+group_code,chgroup)
    }

    getOneGroup(group_code) {
        return axios.get(GROUP_MANA+"/"+group_code);
    }

    excelinput(exceldata) {
        return axios.post(GROUP_LIST, exceldata);
    }
    // 영지 추가(1) end



}

export default new BoardService();
