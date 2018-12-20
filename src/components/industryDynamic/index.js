import React, {Component} from 'react';
import {Button, Card, Table, Divider, Pagination,Modal,DatePicker,message  } from "antd";
import {connect} from 'react-redux'
import {actionCreators}  from './store'
import ReactQuill from 'react-quill';
import axios from 'axios';
import UploadImg from '../../common/uploadImg'
import * as Api from '../../api'
import 'react-quill/dist/quill.snow.css';
import uniqueId from 'lodash/uniqueId'
const { MonthPicker, RangePicker } = DatePicker;
class Industry extends Component {
    constructor(props){
        super(props)
        this.state={
            visible: false,
            delState:false,
            content: '',
            industryDynamicList:[],
            UpdateVisible:false
        }
    }

    componentDidMount(){
        this.props.getIndustryDynamicList(2,1,10)
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
                this.setState({
                    delIds:selectedRowKeys,
                })
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
                <Modal title="编辑新闻" visible={this.state.UpdateVisible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <div className="input-box">
                        <div className="text">标题:</div><input type="text" defaultValue={this.state.oldTitle} className="input-style title" ref={input=>this.textInput=input} onChange={()=>{this.inputChange()}}/>
                    </div>

                    <div className="input-box">
                        <div className="text">创建时间:</div><DatePicker defaultValue={this.state.createTime} onChange={(date, dateString)=>this.onChange(date, dateString)} />
                    </div>

                    <div className="input-box">
                        <div className="text">图片:</div>
                        {/*<form action="" encType="multipart/form-data"><input type="file" className="input-style image" ref={file=>this.imgFile=file} placeholder='上传封面图片' onChange={()=>{this.getImg(this.imgFile)}}/></form>*/}
                        <UploadImg />
                    </div>
                    <div className="input-box">
                        <div className="text">内容:</div>
                        <ReactQuill value={this.state.content}
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
                        {/*<form action="" encType="multipart/form-data"><input type="file" className="input-style image" ref={file=>this.imgFile=file} placeholder='上传封面图片' onChange={()=>{this.getImg(this.imgFile)}}/></form>*/}
                        {/*<UploadImg ref={content=>this.upload=content} getImgBase64={()=>this.getImgBase64()}/>*/}
                        <input accept="image/*" name="img" id="upload_file" type="file" onChange={()=>{this.getImg()}}/>
                    </div>
                    <div className="input-box">
                        <div className="text">内容:</div><ReactQuill value={this.state.content}
                                                                   onChange={this.handleChange}
                                                                   modules={modules}
                    />
                    </div>
                </Modal>
                <Card title="行业动态">
                    <Button type="primary" className='primary' onClick={()=>{this.showModal()}}>新增</Button>
                    <Button type="danger" onClick={()=>{this.batchDelete(this.state.delIds)}} >删除</Button>
                </Card>
                <Modal title="确认删除" visible={this.state.delState}
                       onOk={this.confirmDelete} onCancel={this.cancelDelete}
                >
                    <p>确认要删除吗?</p>
                </Modal>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.industryDynamicList} rowKey={(industryDynamicList)=>industryDynamicList.id} key={this.props.industryDynamicList.id} pagination={false} />
                <Pagination onChange={(page,pageSize)=>{
                    this.props.getIndustryDynamicList(2,page,pageSize)
                }}defaultCurrent={1} total={50} style={{float:'right',marginTop:'20px'}} />
            </div>
        );
    }
    beforeUpload=(file)=> {
        const isJPG = file.type === 'image/jpeg'||'image/png';
        if (!isJPG) {
            message.error('You can upload JPG or PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }
    getImg=()=>{
        let file = document.getElementById("upload_file").files[0];
        if(this.beforeUpload(file)){
            let r = new FileReader();  //本地预览
            r.onload = ()=>{
                this.setState({image:r.result});//图片的base64
            }
            r.readAsDataURL(file);    //Base64
        }

        /*let formData = new FormData();
        formData.append('file',fileDom.files[0]);  //添加图片信息的参数
        this.setState({
            imgFile:formData
        })*/
    }
    inputChange=()=>{
        this.setState({
            title:this.textInput.value
        })
    }

    // 批量删除
    batchDelete=(ids)=>{
        this.setState({
            delState: true,
            ids
        });
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
        // 判断是单条记录删除还是批量删除
        if (id != null){
            axios.delete(Api.DELETE+"?id="+id).then((res)=>{
                if (res.data.success) {
                    alert("删除成功!");
                }else{
                    alert("删除失败,请联络管理员!");
                }
            });
        }else {
            let ids = this.state.ids;
            axios.delete(Api.DELETE+"?id="+ids).then((res)=>{
                if (res.data.success) {
                    alert("删除成功!");
                }else{
                    alert("删除失败,请联络管理员!");
                }
            })
        }
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
        let { content,createTime,title,image }=this.state
        let body={
            typeId:2,
            title,
            content,
            createTime,
            image,
        }
        this.props.uploadEditor(body)
        this.setState({visible: false});

    }
    handleCancel = () => {
        this.setState({
            visible: false,
            UpdateVisible:false
        });
    }

    handleChange=(value)=>{
        this.setState({ content: value })
    }
}

const mapStateToProps=(state)=>({
    industryDynamicList:state.industry.industryDynamicList
})

const mapDispatchToProps=(dispatch)=>({
    getIndustryDynamicList(id,page,pageSize){
        dispatch(actionCreators.getIndustryDynamicList(id,page,pageSize))
    },
    uploadEditor(body){
        dispatch(actionCreators.uploadEditor(body))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Industry);
