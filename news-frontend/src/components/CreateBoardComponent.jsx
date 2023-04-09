import React, {Component, useState, useEffect} from 'react';
import BoardService from '../service/BoardService';
import * as function1 from '../cards/SummernoteEditor';
import styles from 'styled-components';
import LaddaButton, {XL, EXPAND_LEFT} from 'react-ladda-button';
import 'react-ladda-button/dist/ladda.min.css'
//import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {Essentials, Heading, Bold, Italic, Underline, Link, Table, TableToolbar, Paragragh} from '@ckeditor/ckeditor5-build-classic';
import ProductPreviewEditing from '@ckeditor/ckeditor5-build-classic';
import {ProductPreview} from '@ckeditor/ckeditor5-react';
import ReactDOM from 'react-dom';
import {useDropzone} from 'react-dropzone';

import moment from 'moment';
import 'moment/locale/ko';
//import { List, Map } from 'immutable';
import ReactSummernote from 'react-summernote';
import classNames from 'classnames/bind';
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import Modal from 'react-awesome-modal';
import styled from 'styled-components';

const cx = classNames.bind(styles);
class CreateBoardComponent extends React.Component {
    constructor(props) {
        super(props);

        //dropzone 사용
        this.state = {picture: []};
        this.onDrop = this.onDrop.bind(this);

        this.state = {
            title: '',
            contents: '',
            memberNo: '',
            memberRev: '',
            createdTime: '',
            file_id: '',

            group_code: '',
            group_title: '',

            loading: false,
        }

        this.state = { //20210630 그룹별전송
            visible: false,
            groups: [],
            groupTitle: [],
            groupAllTitle: [],
            element: [],
            result: [],
            name2: []
            // group_code: this.state.group_code,
        }

        const getColor = (props) => {
            if (props.isDragAccept) {
                return '#00e676';
            }
            if (props.isDragReject) {
                return '#ff1744';
            }
            if (props.isDragActive) {
                return '#2196f3';
            }
            return '#eeeeee';
        }
        const Container = styled.div`
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            border-width: 2px;
            border-radius: 2px;
            border-color: ${props => getColor(props)};
            border-style: dashed;
            background-color: #fafafa;
            color: #bdbdbd;
            outline: none;
            transition: border .24s ease-in-out;
        `;

        this.editorconfig = {
            plugins: [
                Essentials, Heading, Bold, Italic, Underline, Link, Paragragh, Table, TableToolbar,
                ProductPreviewEditing
            ],
            toolbar: [
                'heading',
                '|',
                'bold', 'italic', 'underline',
                '|',
                'link', 'insertTable',
                '|',
                'undo', 'redo'
            ],
            table: {
                contentToolbar: [
                    'tableColum',
                    'tableRow',
                    'mergeTableCells'
                ]
            },
            products: {
                productRenderer: (id, domElemnet) => {
                    const product = this.props.product.find(product => product.id === id);
                    ReactDOM.render(
                        <ProductPreview id={id} {...product} />,
                        domElemnet
                    );
                }
            }
        };


        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeMemberNoHandler = this.changeMemberNoHandler.bind(this);
        this.changeMemberRevHandler = this.changeMemberRevHandler.bind(this);
        this.changeCreatedTimeHandler = this.changeCreatedTimeHandler.bind(this);
        this.changeFileIdHandler = this.changeFileIdHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.handleEditorDataChange = this.handleEditorDataChange.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.checkHandler = this.checkHandler.bind(this);

    }


    //dropzone 사용

    onDrop(pictureFiles, pictureBase64) {
        this.setState({
            pictures: this.state.picture.concat(pictureFiles)

        });
        console.log(this.state.pictures)
        // return axios.post(BoardService.BOARD_API_BASE_URL);
    }

    componentDidMount() {
        BoardService.getGroups().then((res) => {
            this.setState({groups: res.data});

            console.log(res.data);
            for (let index = 0; index < this.state.groups.length; index++) {
                this.state.element.push(this.state.groups[index].group_title);
            }
            console.log(this.state.element)
            const set = new Set(this.state.element);
            const uniqueArr = [...set];
            console.log("유니크: " + uniqueArr)
        });
    }

    openModal = function() {
        this.setState({ visible: true });
    };
    closeModal = function() {
        this.setState({ visible: false });
    };

    onChecked(event) {

    }

    gotoMemberRev = () => {
        console.log(this.state.groupTitle)
        const set = new Set(this.state.groupTitle);
        const uniqueArr = [...set];
        this.setState({
            memberRev: uniqueArr.toString()
        });
        this.closeModal()
    };

    changeTypeHandler = (event) => {
        this.setState({type: event.target.value});
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }


    changeMemberNoHandler = (event) => {
        this.setState({memberNo: event.target.value});
    }

    changeMemberRevHandler = (event) => {
        this.setState({memberRev: event.target.value});
    }

    changeCreatedTimeHandler = (event) => {
        const createdTime = new Date('YYYY-MM-DD HH:mm:ss')
        console.log(createdTime);
        this.setState({createdTime: event.target.createdTime});
    }

    changeFileIdHandler = (event) => { //20210607 파일첨부
        this.setState({file_id: event.target.file_id})
        console.log(this.state.file_id)
    }

    sendMail = (event) => {
        event.preventDefault();
        let board2 = {
            title: this.state.title,
            contents: this.state.contents,
            memberNo: this.state.memberNo,
            memberRev: this.state.memberRev,
            createdTime: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        };
        BoardService.mailStart(board2).then(res => {
            alert("메일 전송이 완료되었습니다.")
            this.props.history.push('/create-board');
        });
    }


    createBoard = (event) => {
        event.preventDefault();
        if (this.state.memberNo == null || this.state.memberNo == ' ')
            alert("자신의 E-Mail주소를 입력해주세요.")
        else if (this.state.memberRev == null || this.state.memberRev == ' ')
            alert("받는 사람을 입력해주세요.")
        else if (this.state.title == null || this.state.title == ' ')
            alert("제목을 입력해주세요.")
        else if (this.state.contents == null || this.state.contents == ' ')
            alert("내용을 입력해주세요.")
        else {
            this.setState({
                loading: true
            });
            let board = {
                type: this.state.type,
                title: this.state.title,
                contents: this.state.contents,
                memberNo: this.state.memberNo,
                memberRev: this.state.memberRev,
                createdTime: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                file_id: this.state.file_id
            };
            BoardService.createBoard(board).then(res => {
                this.props.history.push('/create-board');
            });

            console.log("board => "+ JSON.stringify(board));
            BoardService.mailStart(board).then(res => {
                alert(res.data);
                this.props.history.push('/create-board');
                this.setState({
                    loading: false,
                });
            });
        }
    }

    cancel() {
        this.props.history.push('/board');
    }

    handleEditorDataChange = (event) => {
        console.log("onChange", event);
        this.setState({contents: event});
    };

    onImageUpload = (images, insertImage) => {
        for (let i=0; i<images.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                insertImage(reader.result);
            };
            reader.readAsDataURL(images[i]);
        }
    }

    onFileUpload = (File, insertFile) => {
        for(let i=0; i<File.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                insertFile(reader.result);
            };
            reader.readAsDataURL(File[i]);
        }
    }

    checkHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if(e.target.value == true) {
            this.state.groupTitle.push(e.target.name)
        } else if(e.target.value == false) {
            //this.state.groupTitle.pop(e.target.name)
            for(let i =0; i<this.state.groupTitle.length; i++) {
                if(this.state.groupTitle[i] === e.target.name) {
                    this.state.groupTitle.splice(i, 1);
                    i--;
                }
            }
        }this.setState({
            groupTitle: this.state.groupTitle
        })
        //console.log([e.target.name], e.target.value);
        console.log(this.state.groupTitle)
        //console.log([this.state.groupTitle])
    }

    checkAllHandler = (e) => {

        for (let index = 0; index < this.state.groups.length; index++) {
            this.state.groupTitle.push(this.state.groups[index].name)

            const set = new Set(this.state.groupTitle);
            const uniqueArr = [...set];
            this.setState({
                memberRev: uniqueArr.toString()
            });
        }
        console.log(this.state.groupTitle)
    }


    render() {
        const rendering = () => {
            const set = new Set(this.state.element);
        const uniqueArr = [...set];
        this.state.result[0] = <option value="AllGroup">전체</option>
        let j = 1
        for(let i=0; i<uniqueArr.length; i++) {
            this.state.result[j] = <option value={uniqueArr[i]}>{uniqueArr[i]}</option>
            j++;
        }
        return this.state.result
    }
    return (
            <div className = "App">
                <br/>
                <div className="form-wrapper">
                    <p className="p1">뉴스레터 작성</p>
                    <form id="frm" name="frm" action="/createBoard" method="post">
                    <div>
                            <p className="p3" for="memberNO"> 자신의 E-mail주소 </p>
                            <input type="text"placeholder="  자신의 E-Mail주소를 입력하세요." name="memberNo" className="memberNo-input"
                                   value={this.state.memberNo} onChange={this.changeMemberNoHandler} style={{fontFamily:"squreR"}}/></div>
                        <div>
                            <p className="p3" for="memberRev"> 받는 사람</p>
                            <input type="text" placeholder="  받는 사람의 E-Mail주소를 입력하세요." name="memberRev" className="memberRev-input"
                                   value={this.state.memberRev} onChange={this.changeMemberRevHandler} style={{fontFamily:"squreR"}}/>
                                <button type="button" className="btn2" style={{ marginRight:"5px" , marginLeft:"8px" ,padding:"9px 9px" , fontSize:"13.5px"}} onClick={() => this.openModal()}>수신자 선택</button>
                                <button type="button" className="btn1" style={{ padding:"9px 9px", fontSize:"13.5px"}} onClick={this.checkAllHandler}>전체 전송</button></div>



                        <Modal visible={this.state.visible} width="800" height="700" effect="fadeInDown"onClickAway={() => this.closeModal()}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={() => this.closeModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" style={{fontWeight:"bold"}}>수신자 선택</h4>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th className="text-center">선택</th>
                                        <th className="text-center">그룹 명</th>
                                        <th className="text-center">이름</th>
                                        <th className="text-center">메일</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.groups.map(
                                            group =>
                                                <tr key = {group.email}>
                                                    <td> <input type="checkbox" name={group.name} onChange={(e) => { this.checkHandler({ target: { name: e.target.name, value: e.target.checked,},});}}/></td>
                                                    <td> {group.group_title} </td>
                                                    <td> {group.name} </td>
                                                    <td> {group.email} </td>
                                                </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                                <div className="modal-footer">
                                    <input value="확인" type="button" className="btn btn-success" onClick={this.gotoMemberRev}/>
                                    <input value="닫기" type="button" className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.closeModal()} />
                                </div>
                            </div>
                        </Modal>



                            <div>
                            <p className="p3" for="title"> 제목 </p>
                            <input type="text" placeholder="  제목을 입력하세요." name="title" className="title-input"
                                   value={this.state.title} onChange={this.changeTitleHandler} style={{fontFamily:"squreR"}}/>
                            </div>
                           <p className="p3" for="contents"> 내용 </p>
                            <div className="App2">
                                <ReactSummernote
                                    editor ={ClassicEditor}
                                    name = "contents"
                                    value = {this.state.contents}
                                    options = {{
                                        lang: "ko-KR",
                                        width: 1016,
                                        height: 600,
                                        dialogsInBody: true,
                                        toolbar: [
                                            ["style", ["style"]],
                                            ["font", ["bold", "underline", "clear"]],
                                            ["fontname", ["fontname", "impact"]],
                                            ["para", ["ul", "ol", "paragraph"]],
                                            ["table", ["table"]],
                                            ["insert", ["link", "picture", "video", "files"]],
                                            ["view", ["fullscreen", "codeview"]]
                                        ]
                                    }}
                                    onReady = {this.handleEditorReady}
                                    onChange = {this.handleEditorDataChange}
                                    onImageUpload = {this.onImageUpload}
                                    onFileUpload = {this.onFileUpload}
                                    onDrop = {this.onDrop}
                                    />
                            </div>
                        </form>
                    </div>
                    <LaddaButton loading={this.state.loading} onClick={this.createBoard} className='btn1' data-style={EXPAND_LEFT}
                                 data-spinner-size={30} data-spinner-color="#ddd" data-spinner-lines={12} >메일 전송</LaddaButton>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"7px"}}>취소</button>

            </div>
        );
    }
}

// function createBoard() {
//     var formData = get("#formtag").serialize();
//     axios.get({
//         mimeType: "text/html; charset=utf-8"
//         , type: 'post'
//         , url: 'find_pw.do'
//         , dataType: 'json'
//         , data: formData
//         , success: function (data) {
//             var meg = data.msg;
//             alert(meg);
//         }
//         ,error: function (request, status, error) {
//             console.log("code: "+status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
//             alert('나문희사항');
//         }
//         ,async: true
//     });
// }

export default CreateBoardComponent;