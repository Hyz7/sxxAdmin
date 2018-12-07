import React, { Component } from 'react';
import * as API from '../../api'
import axios from 'axios'
import { Card,Button, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox,Table ,Icon,Alert,Modal,Pagination} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Home extends Component {
    state={
        status:false,
        newsList:[],
        editList:[],
        visible: false,
        editStatus:false
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    componentDidMount(){
        this.getNewsList(1,10)
    }
    componentDidUpdate(){
        // this.getNewsList()
    }
    getNewsList=(page,pageSize)=>{
        console.log(page,'******************')
        axios.get(API.GETNEWSLIST+'?typeId=1&page='+page+'&size='+pageSize+'').then(res=>{
            if(res.data.success){
                this.setState({newsList:res.data.dynamics})
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    /*显示编辑界面*/
    edit=(id)=>{
        console.log(id)
        axios.get(API.EDIT+'?id='+id).then(res=>{
            if(res.data.success){
                this.setState({
                    editList:res.data.dynamic,
                    id:res.data.dynamic.id,
                    title:res.data.dynamic.title,
                    typeId:res.data.dynamic.typeId,
                    content:res.data.dynamic.content,
                    image:res.data.dynamic.image,
                    createTime:res.data.dynamic.createTime,
                },()=>{
                    let {title,typeId,content,image,createTime} = this.state.editList;
                    this.title.value=title
                    this.typeId.value=typeId
                    this.content.value=content
                    this.image.value=image
                    this.createTime.value=createTime
                });
        }
    }).catch(err=>{
        console.log(err);
    })}

    handleEditOk=()=>{
        this.setState({editStatus:true})
    }
    handleCancel = () => {
        this.setState({ editStatus: false });
    }
    commitInfo=()=>{
        const {id,title,typeId,image,content,createTime}=this.state
        axios.post(API.UPDATE+'/',{
            id,
            title,
            typeId,
            content,
            createTime,
            image
        }).then(res=>{
            if(res.data.success){
                this.setState({editStatus:false});
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    handleChange=()=>{
        this.setState({
            title:this.title,
            typeId:this.typeId,
            image:this.image,
            content:this.content,
            createTime:this.createTime,
        })
    }
    render(){
        /*复选框中编辑和删除按钮*/
        const rowSelection = {
            /*删除记录*/
            del:(id)=>{
                let bool=confirm('确认删除?')
                if(bool){
                    axios.delete(API.DELETE+'?id='+id).then(res=>{
                        if(res.data.success){
                            // alert("删除成功!");
                            this.setState({visible:true});
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }

            },

        };
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        }, {
            title: '图片地址',
            dataIndex: 'image',
            key: 'image',
        },{
            title: '操作',
            dataIndex: 'createTime',
            key: 'make',
            /*按钮*/
            render: (text, record) => (
                <div className="box">
                    <Button type="dashed" style={{
                        marginRight:'15px'
                    }} onClick={()=>{
                        this.edit(record.id)
                        this.handleEditOk()
                    }}>编辑</Button>
                    <Button type="danger" onClick={()=>{rowSelection.del(record.id)}}>删除</Button>
                </div>
            ),
        },];
        let { status,newsList }=this.state
        return (
            <div>
                <Modal title="修改信息" visible={this.state.editStatus}
                       onCancel={()=>this.handleCancel()}
                       onOk={()=>this.commitInfo()}
                >
                    <div>
                        <form >
                            <div className="box" >
                                <input type="hidden"/>
                                <label>标题：</label><input type="text" placeholder='title' style={{width:'100%'}} ref={(refs)=>this.title=refs} onChange={()=>{this.handleChange()}}/><br/>
                                <input type="text" placeholder='typeId' style={{width:'100%'}} ref={(refs)=>this.typeId=refs} onChange={()=>{this.handleChange()}}/><br/>
                                <label>分类：</label><br/>
                                <select name="typeId" ref={(refs)=>this.typeId=refs} >
                                    <option value="1" selected="selected">新闻资讯</option>
                                    <option value="2">行业动态</option>
                                    <option value="3">学员动态</option>
                                </select><br/>
                                <label>内容：</label><input type="text" placeholder='content' style={{width:'100%'}} ref={(refs)=>this.content=refs} onChange={()=>{this.handleChange()}}/><br/>
                                <label>图片：</label><input type="text" placeholder='image' style={{width:'100%'}}  ref={(refs)=>this.image=refs} onChange={()=>{this.handleChange()}}/><br/>
                                <label>创建时间：</label><input type="text" placeholder='createTime' style={{width:'100%'}} ref={(refs)=>this.createTime=refs} onChange={()=>{this.handleChange()}}/>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Card title="新闻资讯">
                    {/*新增按钮*/}
                    <Button type="primary" onClick={()=>{this.handleAdd()}}>新增</Button><br/><br/>
                    {/*插入表格*/}
                    {console.log(this.state.editList.id,'************')}
                    <Table rowSelection={rowSelection} columns={columns} dataSource={newsList}pagination={false}/>
                    {/*操作提示*/}
                    <div>
                        <Modal title="提示" visible={this.state.visible}
                               onOk={this.handleOk}
                        >
                            <p>操作成功!</p>
                        </Modal>
                    </div>
                    <Pagination defaultCurrent={1} total={50} style={{float:'right'}} onChange={(page, pageSize)=>{
                        // this.handleSizeChnage(current, size)
                        this.getNewsList(page,pageSize);
                    }}/>
                </Card>

            </div>
        )
    }
    handleAdd=()=>{
        this.setState({status:true})
    }
    handleSelect=(e)=>{
        console.log(e.target.value)

    }
}

export default Home;