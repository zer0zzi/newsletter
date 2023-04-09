import React, { useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { post } from 'axios';
import BoardService from "../service/BoardService";
import {Link} from 'react-router-dom';
import Modal from 'react-awesome-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import {ExcelRenderer} from 'react-excel-renderer';
import {XLSX} from "xlsx"
import {InputGroup, InputGroupAddon, FormGroup } from 'reactstrap';
import icon from "../image/엑셀 아이콘.png";


class GroupComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [{
                id: '',
                name:'',
                email:'',
                group_title:'',
                pageOfItems: [], //페이징처리
            }],

            groupmana: [],

            subs:[{
                id:'',
                name: '',
                email: '',
                group_title:''
            }],

            chsubs:[{
                id:'',
                name:'',
                email:'',
                group_title:''
            }],

            group:[{
                group_code:'',
                group_title:''
            }],

            chgroup:[{
            }],

            excelupload:[{
                dataLoaded: 'false',
                isFormInvalid: 'false',
                rows:'',
                cols:''
            }],

            exceldata:[{
            }],

        }
        this.changeidHandler = this.changeidHandler.bind(this);
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeemailHandler = this.changeemailHandler.bind(this);
        this.changegrouptitleHandler = this.changegrouptitleHandler.bind(this);
        this.subsinsert = this.subsinsert.bind(this);
        this.subsdelete = this.subsdelete.bind(this);
        this.subsupdate = this.subsupdate.bind(this);
        this.changegroupcodeHandler = this.changegroupcodeHandler.bind(this);
        this.changegrouptitle2Handler = this.changegrouptitle2Handler.bind(this);
        this.changeemailHandler = this.changeemailHandler.bind(this);
        this.groupinsert = this.groupinsert.bind(this);
        this.groupdelete = this.groupdelete.bind(this);
        this.groupupdate = this.groupupdate.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.excelinput = this.excelinput.bind(this);
    }

    componentDidMount() {
        BoardService.getgroup().then((res) => {
            this.setState({ groups: res.data});
            console.log(this.state.groups)
        });
        BoardService.groupmana().then((res) => {
            this.setState({ groupmana : res.data});
            console.log(this.state.groupmana)
        });

    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    changeidHandler = (event) => {
        this.setState({id: event.target.value});
    }

    changenameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeemailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changegrouptitleHandler = (event) => {
        this.setState({group_title: event.target.value});
    }

    subsinsert = (event) => {
        event.preventDefault();
        let group = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            group_title: this.state.group_title
        }
        console.log("group => "+ JSON.stringify(group));
        for(let n=0; n<this.state.groups.length; n++) {
            if(group.email == this.state.groups[n].email) {
                window.confirm("이미 등록된 이메일입니다.");
                return 0;
            } else if(group.name == this.state.groups[n].name){
                window.confirm("이미 등록된 이름입니다. 추가 하시려면 이름을 변경하세요. \n ex) 홍길동A, 홍길동B");
                return 0;
            } else{
                continue;
            }
        }
        BoardService.subsinsert(group).then(res => {
            this.props.history.push('/group');
        });
        window.location.reload();
    }


    subsdelete = (id) => {
        if(window.confirm("주소록을 삭제하시겠습니까?\n삭제된 주소록은 복구할 수 없습니다.")) {
            console.log("delete result => " + JSON.stringify(id));
            BoardService.subsdelete(id).then(res => {
                this.props.history.push('/group');
            });
            window.location.reload();
        }
    };

    subsupdate  = (id) => {
        let chsubs = {
            id: id,
            name: this.state.name,
            email: this.state.email,
            group_title: this.state.group_title
        }
        console.log("수정 된 주소록 번호=> "+ JSON.stringify(chsubs));
        for(let n=0; n<this.state.groups.length; n++) {
            if(chsubs.email == this.state.groups[n].email) {
                window.confirm("이미 등록된 이메일입니다.");
                return 0;
            } else if(chsubs.name == this.state.groups[n].name){
                window.confirm("주소록에 같은 이름이 있습니다. 추가 하시려면 이름을 변경하세요. \n ex) 홍길동A, 홍길동B");
                return 0;
            } else{
                continue;
            }
        }
        if(chsubs.name == null){
            chsubs.name = this.state.subs.name;
        }else if(chsubs.email == null) {
            chsubs.email = this.state.subs.email;
            if(chsubs.group_title == undefined) {
                chsubs.group_title = this.state.subs.group_title;
            }
        }
        BoardService.subsupdate(id,chsubs).then(res => {
            this.setState({ chsubs: res.data })
            this.props.history.push('/group');
        });
        window.location.reload();
    }


    openModal = (id) => {
        this.setState({ visible: true });
        console.log("선택 된 주소록 번호 => "+ JSON.stringify(id));
        BoardService.getOneBoard(id).then(res => {
            this.setState({subs : res.data })
            this.props.history.push('/group');
            this.state.subs.id = id
            console.log(this.state.subs.id)
            this.state.subs.name = this.state.subs[0].name
            console.log(this.state.subs.name)
            this.state.subs.email = this.state.subs[0].email
            console.log(this.state.subs.email)
            this.state.subs.group_title = this.state.subs[0].group_title
            console.log(this.state.subs.group_title)
        });
    };

    closeModal = function() {
        this.setState({ visible: false });
    };

    changegroupcodeHandler = (event) => {
        this.setState({group_code: event.target.value});
    }

    changegrouptitle2Handler = (event) => {
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
        for(let n=0; n<this.state.groupmana.length; n++) {
            if(groupmana.group_title == this.state.groupmana[n].group_title) {
                window.confirm("같은 이름의 그룹이 있습니다.");
                return 0;
            } else {
                continue;
            }
            }
            BoardService.groupinsert(groupmana).then(res => {
                this.props.history.push('/groupmana');
            });
            window.location.reload();
        }

    groupdelete = (group_code) => {
        if(window.confirm("등록된 그룹이 없습니다. 그룹을 추가해주세요.")) {
            console.log("delete result => " + JSON.stringify(group_code));
            BoardService.groupdelete(group_code).then(res => {
                this.props.history.push('/groupmana');
            });
            window.location.reload();
        }
    };

    groupupdate  = (group_code) => {
        let chgroup = {
            group_code: group_code,
            group_title: this.state.group_title
        }
        console.log("수정 된 그룹 번호 => "+ JSON.stringify(chgroup));
        console.log(this.state.group_title)
        for(let n=0; n<this.state.groupmana.length; n++) {
            if(chgroup.group_title == this.state.groupmana[n].group_title) {
                window.confirm("같은 이름의 그룹이 있습니다.");
                return 0;
            } else {
                continue;
            }
        }
        if(chgroup.group_title == null){
            chgroup.group_title = this.state.group.group_title;
        }
        BoardService.groupupdate(group_code,chgroup).then(res => {
            this.setState({ chgroup: res.data })
            this.props.history.push('/groupmana');
        });
        window.location.reload();
    }

    openModal2 = (group_code) => {
        this.setState({ visible: true });
        console.log("선택 된 그룹 번호 => "+ JSON.stringify(group_code));
        BoardService.getOneGroup(group_code).then(res => {
            this.setState({ group: res.data })
            this.props.history.push('/group');
            this.state.group.group_code = group_code
            console.log(this.state.group.group_code)
            this.state.group.group_title = this.state.group[0].group_title
            console.log(this.state.group.group_title)
        });
    };

    exceldata = (event) => {
        this.setState({excelfile: event.target.files});
        this.setState({excelfileName: event.target.files[0].name});
        let excelfile = event.target.files;
        this.fileHandler(excelfile)
    }


    fileHandler = (excelfile) => {
        if(excelfile.length){
            let fileObj = excelfile[0];
            this.renderFile(fileObj)
        }
    }

    renderFile = (fileObj) => {
        ExcelRenderer(fileObj, (err, resp) => {
            if(err){
                console.log(err);
            }
            else{
                this.setState({
                    dataLoaded: true,
                    rows: resp.rows
                });

                for(let i=1; i<= this.state.rows.length; i++){
                    if(this.state.rows[i].length !== 0){
                        let exceldata = {
                            name: this.state.rows[i][0],
                            email: this.state.rows[i][1],
                            group_title: this.state.rows[i][2]
                        }
                        console.log("exceldata => "+ JSON.stringify(exceldata));
                        if(this.state.groupmana.length != 0){
                        for(let s=0; s<this.state.groupmana.length; s++){
                            console.log(exceldata.group_title)
                            if(exceldata.group_title != this.state.groupmana[s].group_title){
                                if(s == this.state.groupmana.length-1){
                                    window.confirm("등록되지 않은 그룹이 있습니다 => " + exceldata.group_title + "\n그룹을 새로 추가하거나 등록된 그룹명으로 변경하세요.");
                                    window.location.reload();
                                    return 0;
                                }
                            }else if(exceldata.group_title == this.state.groupmana[s].group_title){
                                break;
                            }
                        }
                        }else{
                            window.confirm("등록된 그룹이 없습니다. 그룹을 추가해주세요.");
                            // window.location.reload();
                            return 0;
                        }
                        for(let n=0; n<this.state.groups.length; n++) {
                            if(exceldata.email == this.state.groups[n].email) {
                                window.confirm("이미 등록된 이메일이 있습니다 => " + exceldata.email);
                                window.location.reload();
                                return 0;
                            } else if(exceldata.name == this.state.groups[n].name){
                                window.confirm("주소록에 같은 이름이 있습니다 => " + exceldata.name +"\n추가 하시려면 이름을 변경하세요. \n ex) 홍길동A, 홍길동B");
                                window.location.reload();
                                return 0;
                            }else{
                                continue;
                            }
                        }
                    }else{
                        break;
                    }
                }
            }
        });
    }

    excelinput = (event) => {
        event.preventDefault();
        let excelfile = this.state.excelfile;
        if(excelfile.length){
            let fileObj = excelfile[0];
            ExcelRenderer(fileObj, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this.setState({
                        dataLoaded: true,
                        rows: resp.rows
                    });
                    for (let i = 1; i <= this.state.rows.length; i++) {
                        if (this.state.rows[i].length !== 0) {
                            let exceldata = {
                                name: this.state.rows[i][0],
                                email: this.state.rows[i][1],
                                group_title: this.state.rows[i][2]
                            }
                            BoardService.excelinput(exceldata).then(res => {
                                this.props.history.push('/groupexcel');
                            });
                        }else {
                            break;
                        }
                    }
                }window.location.reload();
            });
        }
    }


    render() {
        return (
            <div><br/>
                <p className="p1" style={{float:"center"}}>주소록 및 그룹관리</p><br/>
                <div class="App1" style={{marginRight:"2px", marginBottom:"0px"}}>
                    <Link to ="/create-board"><button className="btn1" style={{marginRight:"127px"}}>글 작성</button></Link>
                </div>
                <Tabs>
                    <TabList className="tablist1">
                        <Tab className="tab1">주소록 관리</Tab>
                        <Tab className="tab1">그룹 관리</Tab>
                    </TabList>
                    <TabPanel>
                        <div class="App2">
                            <br/>
                            <div className="form-wrapper">
                                <div><br/>
                                    <p className="p2" style={{marginLeft: "0px"}}> 주소록 추가
                                    </p>
                                    <div><p className="p5"  style={{fontFamily: "squreB"}}>
                                        이름 <input type="text" name="name" placeholder=" 추가할 주소록의 이름을 입력하세요." value={this.state.name}
                                                  className="sub-input" onChange={this.changenameHandler} />
                                        이메일 <input type="text" name="email" placeholder=" 추가할 주소록의 이메일을 입력하세요." value={this.state.email}
                                                   className="sub-input" onChange={this.changeemailHandler} />
                                        그룹 <select className="select" value={this.state.group_title} onChange={this.changegrouptitleHandler}>
                                        <option hidden value="">그룹을 선택하세요.</option>
                                        {this.state.groupmana.map((group_info, key) => (
                                            <option value={group_info.group_title} key={key}>{group_info.group_title}</option>
                                        ))}
                                    </select>
                                        <button type="submit"  onClick={this.subsinsert} style={{width : "90px", height : "30px"}}>추가하기</button>
                                        <br/><br/>
                                        <div>
                                            <form>
                                                <FormGroup style={{marginBottom:"10px"}}>
                                                    <InputGroup style={{marginRight : "0px"}}>
                                                        <InputGroupAddon addonType="prepend">
                                                            <div>
                                                                엑셀 파일 업로드
                                                                <input type="text" className="excelfilebox"  value={this.state.excelfileName} style={{marginLeft: "6px"}} readOnly />
                                                                <label className="btn3" for= "input-file" style={{marginRight: "5px"}} >파일 선택</label>
                                                                <input type="file" id="input-file"  accept=".xlsx" style={{display:"none"}} onChange={this.exceldata} ></input>
                                                                <button className="btn4"  onClick={this.excelinput.bind(this)} style={{marginRight: "5px"}}> 업로드 </button>
                                                                <a href="/download/주소록 양식.xlsx" className = "btn4" style={{ fontSize: "14px", marginLeft: "0px", marginRight: "5px", backgroundColor:"#04B404"}} download ><img className="icon" src={icon}/> 양식 다운로드 받기</a>
                                                            </div>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </FormGroup>
                                            </form>
                                        </div>

                                        <hr style={{marginTop:"6px", marginBottom:"8px", borderTop:"1px solid", color:"#d8d8d8"}}/>
                                    </p></div>
                                </div><br/><br/>


                                <div>
                                    <p className="p2" style={{marginLeft: "0px", marginBottom:"10px"}}> 주소록 목록 </p>
                                    <table className="table table-striped table-bordered" style={{textAlign : "left", tableLayout : "fixed" , width : "100%"}}>
                                        <thead>
                                        <tr>
                                            <th width="11%"> 이름</th>
                                            <th width="32%">이메일</th>
                                            <th width="27%">그룹</th>
                                            <th width="9%">수정 및 삭제</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.groups.map(
                                                (subscriber_info) =>
                                                    <tr key = {subscriber_info.id}>
                                                        <td> {subscriber_info.name} </td>
                                                        <td> {subscriber_info.email} </td>
                                                        <td> {subscriber_info.group_title} </td>
                                                        <button className="btn2" onClick={() => this.openModal(subscriber_info.id)} style={{marginLeft:"4px", marginTop:"2px", marginBottom:"2px"}}>수정</button>
                                                        <button className="btn btn-danger" onClick={() => this.subsdelete(subscriber_info.id)} style={{marginLeft:"5px", marginTop:"2px",marginBottom:"2px", fontFamily: "squreB"}}>삭제</button>

                                                        <Modal visible={this.state.visible} value={() => this.openModal(subscriber_info.id)} width="600" height="500" onClickAway={() => this.closeModal()}>
                                                            <div className="modal-header">
                                                                <h4 className="modal-title" >수정하기</h4>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div><p className="p5"  style={{fontFamily: "squreB"}}>
                                                                    &nbsp;&nbsp; 이름 <br/>
                                                                    <input type="text" name="updatename" placeholder={this.state.subs[0].name} value={this.state.updatename}
                                                                           className="sub-input" onChange={this.changenameHandler} /> <br/>
                                                                    &nbsp;&nbsp; 이메일 <br/>
                                                                    <input type="text" name="updateemail" placeholder={this.state.subs[0].email} value={this.state.updateemail}
                                                                           className="sub-input" onChange={this.changeemailHandler} /><br/>
                                                                    &nbsp;&nbsp;그룹<br/>
                                                                    <select className="select" name="updategroup_title" value={this.state.updategroup_title} onChange={this.changegrouptitleHandler}>
                                                                        <option hidden value="" selected>{this.state.subs[0].group_title}</option>
                                                                        {this.state.groupmana.map((group_info, key) => (
                                                                            <option value={group_info.group_title} key={key}> {group_info.group_title}</option>
                                                                        ))}
                                                                    </select>
                                                                </p><br/></div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <input value="확인" type="button" className="btn btn-success" onClick={() => this.subsupdate(this.state.subs.id)}/>
                                                                <input value="닫기" type="button" className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.closeModal()} />
                                                            </div>
                                                        </Modal>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div class="App2">
                            <br/>
                            <div className="form-wrapper">
                                <div><br/>
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
                                                        <button className="btn2" onClick={() => this.openModal2(group_info.group_code)} style={{marginLeft:"4px", marginTop:"2px", marginBottom:"2px"}}>수정</button>
                                                        <button className="btn btn-danger" onClick={() => this.groupdelete(group_info.group_code)} style={{marginLeft:"5px", marginTop:"2px",marginBottom:"2px", fontFamily: "squreB"}}>삭제</button>

                                                        <Modal visible={this.state.visible} value={() => this.openModal2(group_info.group_code)} width="600" height="500" onClickAway={() => this.closeModal()}>
                                                            <div className="modal-header">
                                                                <h4 className="modal-title" >수정하기</h4>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div><p className="p5"  style={{fontFamily: "squreB"}}>
                                                                    &nbsp;&nbsp; 그룹 이름 <br/>
                                                                    <input type="text" name="updategrouptitle" placeholder={this.state.group[0].group_title} value={this.state.updategrouptitle}
                                                                           className="sub-input" onChange={this.changegrouptitleHandler} /> <br/>
                                                                </p><br/></div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <input value="확인" type="button" className="btn btn-success" onClick={() => this.groupupdate(this.state.group.group_code)}/>
                                                                <input value="닫기" type="button" className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.closeModal()} />
                                                            </div>
                                                        </Modal>

                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>

        );
    }
}



export default GroupComponent;