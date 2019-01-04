import React, {Component} from 'react';
import {Button, Card, Table, Pagination,Modal,Upload ,Icon,message  } from "antd";
import axios from 'axios'
import * as API from '../../api'
import ReactQuill from "react-quill";
import {connect} from 'react-redux'
import uniqueId from 'lodash/uniqueId'
import * as actionCreators from './store/actionCreators'
class Download extends Component {
    state={
        fileList:[],
        addVisible:false,
        image:'',
        content:'',
        updateVisible:false,
        dataId:''
    }
    showModal = () => {
        this.setState({addVisible: true});
    }
    handleUpdateOk=(id)=>{
        const {price,dataTitle,content,image,file}=this.state
        this.setState({updateVisible: false});

        let body={
            dataId:id,
            dataTitle,
            dataDesc:content,
            image,
            price,
            industry:'1',
            type:'免费'
        }

        let body1=JSON.stringify(body)
        const formData = new FormData()
        formData.append('file',file)
        formData.append('dataEntity',body1)

        axios.post(API.UPDATE_DOWNLOAD_INFO,formData,{headers:{ enctype: "multipart/form-data"}}).then(res=>{
            this.setState({
                dataId:'',
                dataTitle:'',
                price:'',
                content:'',
                image:'',
                file:''
            });
        })
    }
    handleUpdate=(record)=>{
        this.setState({
            updateVisible:true,
            dataId:record.dataId,
            dataTitle:record.dataTitle,
            price:record.price,
            content:record.dataDesc,
            image:record.image,

        })
    }
    handleOk = () => {
        const {dataTitle,price,content,image,file}=this.state
        this.setState({addVisible: false,});

        let body={
            dataTitle:dataTitle,
            dataDesc:content,
            image,
            price:price,
            industry:'1',
            type:'免费'
        }

        let body1=JSON.stringify(body)
        const formData = new FormData()
        formData.append('file',file)
        formData.append('dataEntity',body1)

        axios.post(API.ADD_DOWNLOAD_INFO,formData,{headers:{ enctype: "multipart/form-data"}}).then(res=>{
            this.setState({
                dataId:'',
                dataTitle:'',
                price:'',
                content:'',
                image:'',
                file:''
            });
        })
    }
    handleCancel = () => {
        this.setState({
            addVisible: false,
            updateVisible:false,
            dataId:'',
            dataTitle:'',
            price:'',
            content:'',
            image:'',
        });
    }

    componentDidMount() {
        this.props.getDownloadList(1,10)
    }

    confirmDelete = (id) =>{
        if(confirm("是否删除该条数据？")){
            axios.delete(API.DELETE_DOWNLOAD_INFO+"?ids="+id).then((res)=>{
                if (res.data.success) {
                    message.success("删除成功!");
                    this.props.getDownloadList()
                }else{
                    message.warning("删除失败,请联络管理员!");
                }
            });
        }
    }

    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'dataTitle',
            key: 'dataTitle',
            render: text => <a href="#">{text}</a>,
        },
        {
            title: '内容',
            dataIndex: 'dataDesc',
            key: 'dataDesc',
            width:'500px'
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width:'70px'
        },
        {
            title: '封面',
            dataIndex: 'image',
            key: 'image',
            render:(image)=>(
                <img src={image} style={{width:'100px',height:'100px'}} alt=""/>
            )
        },
        {
            title:'文件',
            dataIndex:'dataKey',
            key:'dataKey'
        },
        {
            title: '操作',
            key: 'make',
            width:'200px',
            render: (text, record) => (
                <span>
                    <Button className='primary' onClick={()=>{
                        this.handleUpdate(record)
                    }}>编辑</Button>
                    <Button className='dangerous' onClick={()=>{
                        this.confirmDelete(record.dataId)
                    }}>删除</Button>
                </span>
            ),
        }];

        const modules = {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
        }
        return (
            <div className='container-download'>
                <Modal title="新增下载" visible={this.state.addVisible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       className='add-download-modal'
                >
                    <div className="input-box">
                        <div className="text">标题:</div><input type="text"
                                                              className="input-style title"
                                                              ref={input=>this.titleInput=input}
                                                              onChange={()=>{
                                                                  this.setState({dataTitle:this.titleInput.value})
                                                              }}
                    />
                    </div>
                    <div className="input-box">
                        <div className="text">图片:</div>
                        <div className="img-box">
                            <img src={this.state.image} alt=""/>
                            <input accept="image/*" name="img" id="upload_img" type="file"
                                   onChange={()=>{this.getImg(this.image)}}
                                   ref={img=>this.image=img}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="text">价格:</div><input type="text"
                                                              className="input-style title"
                                                              ref={input=>this.priceInput=input}
                                                              onChange={()=>{
                                                                  this.setState({price:this.priceInput.value})
                                                              }}
                    />
                    </div>
                    <div className="input-box">
                        <div className="text">描述:</div>
                        <ReactQuill value={this.state.content}
                                    onChange={this.handleChange}
                                    modules={modules}
                        />
                    </div>
                    <div className="input-box file-style" >
                        <div className="text">文件上传:</div>
                        <input type="file" ref={ref=>this.uploadfile=ref} onChange={()=>{
                            this.setState({file:this.uploadfile.files[0]})
                        }}/>
                    </div>
                </Modal>
                <Modal title="编辑白皮书" visible={this.state.updateVisible}
                       onOk={()=>this.handleUpdateOk(this.state.dataId)} onCancel={this.handleCancel}
                       className='add-download-modal'
                >
                    <div className="input-box">
                        <div className="text">标题:</div><input type="text"
                                                              value={this.state.dataTitle}
                                                              className="input-style title"
                                                              ref={input=>this.titleInput=input}
                                                              onChange={()=>{
                                                                  this.setState({dataTitle:this.titleInput.value})
                                                              }}
                    />
                    </div>
                    <div className="input-box">
                        <div className="text">图片:</div>
                        <div className="img-box">
                            <img src={this.state.image} alt=""/>
                            <input accept="image/*" name="img" id="upload_img" type="file"
                                   onChange={()=>{this.getImg(this.image)}}
                                   ref={img=>this.image=img}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="text">价格:</div><input type="text"
                                                              className="input-style title"
                                                              value={this.state.price}
                                                              ref={input=>this.priceInput=input}
                                                              onChange={()=>{
                                                                  this.setState({price:this.priceInput.value})
                                                              }}
                    />
                    </div>
                    <div className="input-box">
                        <div className="text">描述:</div>
                        <ReactQuill value={this.state.content}
                                    onChange={this.handleChange}
                                    modules={modules}
                        />
                    </div>
                    <div className="input-box file-style" >
                        <div className="text">文件上传:</div>
                        <input type="file" ref={ref=>this.uploadfile1=ref} onChange={()=>{
                            this.setState({
                                file:this.uploadfile1.files[0]
                            })
                        }}/>
                    </div>
                </Modal>
                <Card title="资料下载管理">
                    <Button type="primary" style={{marginRight:'20px'}} onClick={this.showModal}>新增资料</Button>
                    {/*<Button type="danger">批量删除资料</Button>*/}
                </Card>
                <Table
                    columns={columns}
                    dataSource={this.props.downloadList}
                    // rowSelection={}
                    rowKey={()=>uniqueId()}
                    pagination={false}
                />
                <Pagination
                    onChange={(page,pageSize)=>{this.setState({page:page},()=>{this.props.getDownloadList(this.state.page,pageSize)})}}
                    defaultCurrent={1} total={this.props.pageResult}
                    style={{float:'right',marginTop:'20px'}}
                />
            </div>
        );
    }
    beforeUploadImg=(file)=> {
        const isJPG = file.type === 'image/jpeg' || 'image/png'|| 'image/jpg';
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
        if(this.beforeUploadImg(file)){

            let r = new FileReader();  //本地预览
            r.onload =()=>{
                this.setState({image:r.result});//图片的base64
            }
            r.readAsDataURL(file);    //Base64
        }
    }

    handleChange=(value)=>{
        this.setState({ content: value })
    }
}

const mapStateToProps=(state)=>({
    downloadList:state.download.list,
    pageResult:state.download.pageResult,
})
const mapDispatchToProps=(dispatch)=>({
    getDownloadList(page,pageSize){
        dispatch(actionCreators.getDownloadList(page,pageSize))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Download);