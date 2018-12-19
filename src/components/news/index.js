import React, {Component} from 'react';
import {Button, Card, Table, Divider, Tag, Pagination,Modal,Select,DatePicker  } from "antd";
import {connect} from 'react-redux'
import * as actionCreators from '../home/store/actionCreators'
import ReactQuill from 'react-quill';
import axios from 'axios';
import * as Api from '../../api'
import 'react-quill/dist/quill.snow.css';
import uniqueId from 'lodash/uniqueId'
const { MonthPicker, RangePicker } = DatePicker;
class News extends Component {
    constructor(props){
        super(props)
        this.state={
            visible: false,
            delState:false,
            content: '',
            newsList:[]
        }
    }

    componentDidMount(){
        this.props.getNewsList(1,1,10)
    }
    onChange=(date, dateString) =>{
        this.setState({createTime:dateString})

    }
    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.newsList !== nextProps.newsList;
    }*/

    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            width: 350,
            minWidth:350,
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '内容',
            dataIndex: 'content',
            width: 350,
            render: text => <div>{text?text.length>200?text.substring(0,200)+'......':null:null}</div>,
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 150
        }, {
            title: '展示图片',
            dataIndex: 'image',
            width:250,
            render: url => <img src={url} style={{width:'200px',height:'200px'}}/>,
        }, {
            title: '分类名称',
            dataIndex: 'typeName',
            width:150
        }, {
            title: '操作',
            dataIndex: 'make',
            width:300,
            render: (text, record) => {
                return (
                    <span>
                  <Button type="dashed">修改</Button>
                  <Divider type="vertical" />
                  <Button type="danger" onClick={()=>this.showDelete(record.id)}>删除</Button>
                </span>
                )
            },
        }];
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        const modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
        }
        const  formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]

        return (
            <div>
                <Modal title="新增页面" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       className='modal-container'
                >
                    <div className="input-box">
                        <div className="text">标题:</div><input type="text" className="input-style title" ref={input=>this.textInput=input} onChange={()=>{this.inputChange()}}/>
                    </div>

                    <div className="input-box">
                        <div className="text">创建时间:</div><DatePicker onChange={(date, dateString)=>this.onChange(date, dateString)} />
                    </div>
                    <div className="input-box">
                        <div className="text">分类:</div>
                        <select placeholder="请选择分类"  className='select' ref={input=>this.selectInput=input} onChange={()=>{this.inputChange()}}>
                            <option >--请选择分类--</option>
                            <option value="1">新闻资讯</option>
                            <option value="2">行业动态</option>
                            <option value="3">学员动态</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <div className="text">图片:</div>
                        <form action="" encType="multipart/form-data"><input type="file" className="input-style image" ref={file=>this.imgFile=file} placeholder='上传封面图片' onChange={()=>{this.getImg(this.imgFile)}}/></form>
                    </div>
                    <div className="input-box">
                        <div className="text">内容:</div><ReactQuill value={this.state.content}
                                    onChange={this.handleChange}
                                    modules={modules}
                        />
                    </div>
                </Modal>
                <Card title="新闻资讯">
                    <Button type="primary" className='primary' onClick={()=>{this.showModal()}}>新增</Button>
                    <Button type="danger" >删除</Button>
                </Card>
                <Modal title="确认删除" visible={this.state.delState}
                       onOk={this.confirmDelete} onCancel={this.cancelDelete}
                >
                    <p>确认要删除吗?</p>
                </Modal>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.newsList} rowKey={(newsList)=>newsList.id} key={this.props.newsList.id} pagination={false} />
                <Pagination onChange={(page,pageSize)=>{
                    this.props.getNewsList(1,page,pageSize)
                }}defaultCurrent={1} total={50} style={{float:'right',marginTop:'20px'}} />
            </div>
        );
    }
    getImg=(fileDom)=>{
        let file = fileDom.files[0];
        let imageType = /^image\//;
        if(!imageType.test(file.type)) {
            alert("请选择图片！");
            return;
        }
        let formData = new FormData();
        formData.append('file',fileDom.files[0]);  //添加图片信息的参数
        this.setState({
            imgFile:formData
        })
    }
    inputChange=()=>{
        this.setState({
            title:this.textInput.value,
            typeName:this.selectInput.value,
        },()=>{
            console.log(this.state.typeName);
        })
    }

    //显示删除页面
    showDelete = (id) =>{
        this.setState({
            delState: true,
            id
        });
    }
    //确认删除
    confirmDelete = () =>{
        let id = this.state.id;
        axios.delete(Api.DELETE+"?id="+id).then((res)=>{
            if (res.data.success) {
                alert("删除成功!");
            }else{
                alert("删除失败,请联络管理员!");
            }
        });
        this.setState({
            delState: false,
        });
    }
    //取消删除
    cancelDelete = () =>{
        this.setState({
            delState: false,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        let { content,createTime,title,imgFile }=this.state
        let body={
            typeId:1,
            title,
            content,
            createTime,
            image:imgFile
        }
        this.props.uploadEditor(body)
        this.setState({visible: false});

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    handleChange=(value)=>{
        this.setState({ content: value })
    }
}

const mapStateToProps=(state)=>({
    newsList:state.home.newsList
})

const mapDispatchToProps=(dispatch)=>({
    getNewsList(id,page,pageSize){
        dispatch(actionCreators.getNewsList(id,page,pageSize))
    },
    uploadEditor(body){
        dispatch(actionCreators.uploadEditor(body))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(News);
