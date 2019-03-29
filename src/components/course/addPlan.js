import React, {Component} from 'react';
import {Input, Modal,Switch,message } from 'antd'
import axios from 'axios'

import * as API from '../../api'
import SelectInput from './selectInput'
class AddPlan extends Component {
    state = { visible: false }

    componentDidMount() {
        // this.props.getTeachPlan()
    }

    showAddPlanModal = (record) => {
        this.setState({
            visible: true,
            courseId:record.courseId
        });
    }

    handleOk = (e) => {
        let {parentId,courseId,pName,timeLength,orderBy,description,status}=this.state

        let body={
            courseId,
            parentId,
            pname:pName,
            timeLength,
            orderBy,
            description,
            status:status?1:0,
        }
        axios.post(API.ADD_TEACH_PLAN,body).then(res=>{
            if(res.status==200){
                message.success('成功添加课程')
            }else{
                message.error('添加课程失败，请重试！')
            }
        })
        this.setState({visible: false});
        this.clearBox()
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.clearBox()
    }
    selectInputId=(id)=>{
        this.setState({parentId:id})
    }
    clearBox=()=>{
        this.setState({
            courseId:'',
            parentId:'',
            pname:'',
            timeLength:'',
            orderBy:'',
            description:'',
            status:'',
        });
    }
    render() {
        return (
            <div className='addPlan-container'>
                <Modal
                    title="添加课程计划"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="inputBox">
                        <div className="type">
                            上级节点
                        </div>
                        {this.state.visible?<SelectInput
                            courseId={this.state.courseId}
                            selectId={(id)=>this.selectInputId(id)}
                        />:null}
                    </div>
                    <div className="inputBox">
                        <div className="type">
                            章节/课时名称
                        </div>
                        <Input placeholder=''
                               onChange={(e)=>{this.setState({pName:e.target.value})}}
                        />
                    </div>
                    <div className="inputBox">
                        <div className="type">
                            学习时长
                        </div>
                        <Input placeholder=''
                               onChange={(e)=>{this.setState({timeLength:e.target.value})}}
                        />
                    </div>
                    <div className="inputBox">
                        <div className="type">
                            排序字段
                        </div>
                        <Input placeholder=''
                               onChange={(e)=>{this.setState({orderBy:e.target.value})}}
                        />
                    </div>
                    <div className="inputBox">
                        <div className="type">
                            章节/课时介绍
                        </div>
                        <Input.TextArea rows={4} placeholder=''
                                        onChange={(e)=>{this.setState({description:e.target.value})}}
                        />
                    </div>
                    <div className="inputBox">
                        <div className="type">
                            状态
                        </div>
                        未发布<Switch onChange={(checked)=>{this.setState({status:checked})}}/>已发布
                    </div>
                </Modal>
            </div>
        );
    }
}


export default AddPlan