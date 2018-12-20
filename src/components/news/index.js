import React, {Component} from 'react';
import {Button, Card, Table, Divider, Tag, Pagination,Modal,Select,DatePicker,Upload ,Icon,message  } from "antd";
import {connect} from 'react-redux'
import {actionCreators}  from './store'
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
            newsList:[],
            UpdateVisible:false
        }
    }

    componentDidMount(){
        this.props.getNewsList(1,1,10)
    }

    onChange=(date, dateString)=>{
        this.setState({createTime:dateString})
    }

    handleUpdate=(content)=>{
        this.setState({
            UpdateVisible:true,
            oldTitle:content.title,
            oldContent:content.content,
            oldCreateTime:content.createTime,
            oldImage:content.image
        })
    }

    getImgBase64=(imageUrl)=>{
        this.setState({
            imageUrl:imageUrl
        },()=>{
            console.log(this.state.imageUrl)
        })
    }

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
                  <Button type="dashed" onClick={()=>this.handleUpdate(record)}>编辑</Button>
                  <Divider type="vertical" />
                  <Button type="danger" onClick={()=>this.showDelete(record.id)}>删除</Button>
                </span>
                )
            },
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
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
                <Modal title="编辑新闻" visible={this.state.UpdateVisible}
                       onOk={()=>this.handleOk(id)} onCancel={this.handleCancel}
                       className='modal-container'
                >
                    <div className="input-box">
                        <div className="text">标题:</div><input type="text" defaultValue={this.state.oldTitle} className="input-style title" ref={input=>this.textInput=input} onChange={()=>{this.inputChange()}}/>
                    </div>

                    <div className="input-box">
                        <div className="text">创建时间:</div><DatePicker placeholder={this.state.oldCreateTime} onChange={(date, dateString)=>this.onChange(date, dateString)} />
                    </div>

                    <div className="input-box">
                        <div className="text">图片:</div>
                        <div className="img-box">
                            <img src={this.state.image||this.state.oldImage} alt=""/>
                            <input accept="image/*" name="img" id="upload_file" type="file"
                                   onChange={()=>{this.getImg(this.updateImage)}}
                                   ref={img=>this.updateImage=img}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="text">内容:</div>
                        <ReactQuill  value={this.state.content}
                            onChange={this.handleChange}
                            modules={modules}
                    />
                    </div>
                </Modal>
                <Modal title="新增新闻" visible={this.state.visible}
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
                        <div className="text">图片:</div>
                        <div className="img-box">
                            <img src={this.state.image} alt=""/>
                            <input accept="image/*" name="img" id="upload_file" type="file"
                                   onChange={()=>{this.getImg(this.addImage)}}
                                   ref={img=>this.addImage=img}
                            />
                        </div>
                        
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
                    this.setState({page:page},()=>{this.props.getNewsList(1,this.state.page,pageSize)})
                }}defaultCurrent={1} total={50} style={{float:'right',marginTop:'20px'}} />
            </div>
        );
    }
    beforeUpload=(file)=> {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        if (!isJPG) {
            message.error('You can upload JPG or PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }
    getImg=(dom)=>{
        let file = dom.files[0];
        if(this.beforeUpload(file)){
            let r = new FileReader();  //本地预览
            r.onload = ()=>{
                this.setState({image:r.result});//图片的base64
            }
            r.readAsDataURL(file);    //Base64
        }
    }
    inputChange=()=>{
        this.setState({
            title:this.textInput.value
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
        this.setState({delState: false});
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
    handleOk = (id) => {
        let { content,createTime,title,image }=this.state
        let body={
            typeId:1,
            title,
            content,
            createTime,
            image,
        }
        let updateBody={
            typeId:1,
            id,
            title,
            content,
            createTime,
            image,
        }
        this.props.uploadEditor(body)
        this.props.uploadUpdate(updateBody)
        this.setState({visible: false,image:''});

    }
    handleCancel = () => {
        this.setState({
            visible: false,
            UpdateVisible:false,
            image:''
        });
    }

    handleChange=(value)=>{
        this.setState({ content: value })
    }
}

const mapStateToProps=(state)=>({
    newsList:state.news.newsList
})

const mapDispatchToProps=(dispatch)=>({
    getNewsList(id,page,pageSize){
        dispatch(actionCreators.getNewsList(id,page,pageSize))
    },
    uploadEditor(body){
        dispatch(actionCreators.uploadEditor(body))
    },
    uploadUpdate(updateBody){
        dispatch(actionCreators.uploadUpdate(updateBody))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(News);
