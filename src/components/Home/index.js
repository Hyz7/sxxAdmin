import React, { Component } from 'react';
import * as API from '../../api'
import axios from 'axios'
import { Card,Button, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox,Table ,Icon,Alert,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Home extends Component {
    state={
        status:false,
        newsList:[],
        visible: false
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
        this.getNewsList()
    }
    componentDidUpdate(){
        this.getNewsList()
    }
    getNewsList=()=>{
        axios.get(API.GETNEWSLIST+'?typeId=1&page=1&size=10').then(res=>{
            if(res.data.success){
                this.setState({newsList:res.data.dynamics})
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        const rowSelection = {
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
            update:()=>console.log(),
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
            render: (text, record) => (
                <div className="box">
                    <Button type="dashed" style={{
                        marginRight:'15px'
                    }} onClick={()=>{rowSelection.update(record.id)}}>编辑</Button>
                    <Button type="danger" onClick={()=>{rowSelection.del(record.id)}}>删除</Button>
                </div>
            ),
        },];
        let { status,newsList }=this.state
        return (
            <div>
                <Card title="新闻资讯">
                    <Button type="primary" onClick={()=>{this.handleAdd()}}>新增</Button><br/><br/>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={newsList}/>
                    <div>
                        <Modal title="提示" visible={this.state.visible}
                               onOk={this.handleOk}
                        >
                            <p>删除成功</p>
                        </Modal>
                    </div>
                </Card>

            </div>
        )
    }
    handleAdd=()=>{
        this.setState({status:true})
    }
}

export default Home;