import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {get} from "jquery";
import { post } from 'axios';
import BoardService from "../service/BoardService";
import {Link} from 'react-router-dom';


class GroupmanaComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupmana:[]
        }

        this.changegroupcodeHandler = this.changegroupcodeHandler.bind(this);
        this.changegrouptitleHandler = this.changegrouptitleHandler.bind(this);
        this.changeemailHandler = this.changeemailHandler.bind(this);
        this.groupinsert = this.groupinsert.bind(this);
    }

    componentDidMount() {
        BoardService.groupmana().then((res) => {
            this.setState({ groupmana: res.data});
            console.log(this.state.groupmana)
        });
    }

    changegroupcodeHandler = (event) => {
        this.setState({group_code: event.target.value});
    }

    changegrouptitleHandler = (event) => {
        this.setState({group_title: event.target.value});
    }

    changeemailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    groupinsert = (event) => {
        event.preventDefault();
        let groupmana = {
            group_code: this.state.group_code,
            group_title: this.state.group_title
        }
        console.log("groupmana => "+ JSON.stringify(groupmana));
        BoardService.groupinsert(groupmana).then(res => {
            this.props.history.push('/groupmana');
        });
        window.location.reload();
    }

    groupdelete = (group_code) => {
        window.confirm("정말로 그룹을 삭제하시겠습니까?\n삭제된 그룹은 복구할 수 없습니다.")
        console.log("delete result => " + JSON.stringify(group_code));
        BoardService.groupdelete(group_code).then(res => {
            this.props.history.push('/groupmana');
        });
        window.location.reload();
    };

    render() {
        return (
            <div class="App2">
                <br/>
                <div className="form-wrapper">
                    <p className="p1">그룹 관리</p>
                        <br/>
                    <div class="App1" style={{marginRight:"2px"}}><Link to ="/group"><button className="btn1"  style={{marginRight:"7px", backgroundColor:"#FFBF00"}}>주소록 관리</button></Link>
                        <Link to ="/create-board"><button className="btn1">글 작성</button></Link></div>
                        <div><hr style={{marginTop:"6px", marginBottom:"26px", borderTop:"1px solid", color:"#d8d8d8"}}/>
                            <p className="p2" style={{marginLeft: "0px"}}> 그룹 추가 </p>
                            <div><p className="p5"  style={{fontFamily: "squreB"}}>
                                그룹 이름 <input type="text" name="name" placeholder=" 추가할 그룹의 이름을 입력하세요." value={this.state.group_title}
                                          className="sub-input" onChange={this.changegrouptitleHandler} />
                                <button type="submit"  onClick={this.groupinsert} style={{width : "90px", height : "30px"}}>추가하기</button>
                                <hr style={{marginTop:"6px", marginBottom:"8px", borderTop:"1px solid", color:"#d8d8d8"}}/>
                            </p></div>
                        </div><br/><br/>

                    <div>
                        <p className="p2" style={{marginLeft: "0px", marginBottom:"10px"}}> 그룹 목록 </p>
                        <table className="table table-striped table-bordered" style={{textAlign : "left", tableLayout : "fixed" , width : "100%"}}>
                            <thead>
                            <tr>
                                <th width="70%">그룹 이름</th>
                                <th width="9%">수정 및 삭제</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.groupmana.map(
                                    group_info =>
                                        <tr key = {group_info.group_code}>
                                            <td> {group_info.group_title} </td>
                                            <button className="btn2" onClick={() => this.subsdelete()} style={{marginLeft:"4px", marginTop:"2px", marginBottom:"2px"}}>수정</button>
                                            <button className="btn btn-danger" onClick={() => this.groupdelete(group_info.group_code)} style={{marginLeft:"5px", marginTop:"2px",marginBottom:"2px", fontFamily: "squreB"}}>삭제</button>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

export default GroupmanaComponent;