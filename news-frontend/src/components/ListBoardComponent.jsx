import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
    // # 1.
        this.state = {
            boards: []
        }
		this.createBoard = this.createBoard.bind(this);
    }
    // # 2.
    componentDidMount() {
        BoardService.getBoards().then((res) => {
            this.setState({ boards: res.data});
        });
    }
    createBoard() {
        this.props.history.push('/create-board/');
    }

    // # 3.
    render() {
        return (
            <div class="App">
                <br/>
                <p className="p1">작성한 뉴스레터</p>
                <br/>
                <div className="row">
                    <div class="App1"><Link to ="/group"><button className="btn1"  style={{marginRight:"7px", backgroundColor:"#FFBF00"}}>주소록 관리</button></Link>
                    <button className="btn1" onClick={this.createBoard}>글 작성</button></div>
                </div>
                <div className ="row1">
                    <table className="table table-striped table-bordered" style={{textAlign : "left"}}>
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>제목 </th>
                                <th>수신자(명)</th>
                                <th>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board =>
                                        <tr key = {board.id}>
                                            <td> {board.id} </td>
                                            <td> {board.title} </td>
                                            <td> <div className="dropdown">
                                                <a className="dropdown-button" style={{cursor: 'pointer'}} contextMenu="dd">{board.count_member_rev}</a>
                                                <div className="dropdown-content">
                                                    {board.member_rev}
                                                </div>
                                            </div>
                                            </td>
                                            <td> {board.created_time} </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListBoardComponent;