import React, {Component} from 'react';
import { message, Popconfirm, Table,Modal,Button } from "antd";
import axios from "axios";
import * as Api from "../../api";

class CourseList extends Component {
    constructor(props){
        super(props)
        this.state = {
            courseList:props.courseList,
            courseImage:''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({courseList: nextProps.courseList});
    }

    render() {
        const columns = [{
            title: '课程名',
            dataIndex: 'courseTitle',
            key: 'courseTitle',
            width:'200px',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '课程描述',
            dataIndex: 'courseSubTitle',
            key: 'courseSubTitle',
            width: '200px'
        },{
            title: '课程封面',
            dataIndex: 'courseImage',
            key: 'courseImage',
            width: '150px',
            render: (text,record) => (
                <div style={{position:'relative',top:-20}}>
                    <img
                        style={{
                            width:'80px',
                            height:'40px',
                            position:'absolute',
                            top:0,
                            left:0
                        }}
                        src={record.courseImage?record.courseImage:null}
                        onClick={(e)=>{
                            e.stopPropagation()
                        }}
                    >
                    </img>
                    <input
                        type="file"
                        accept="image/*"
                        onClick={(e)=>{
                            e.stopPropagation()
                        }}
                        onChange={(e)=>{
                            let formData=new FormData
                            formData.append('courseId',record.courseId)
                            formData.append('imageName','courseImage')
                            formData.append('file',e.target.files[0])
                            axios.post(Api.UPDATE_IMAGE,formData,{
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res=>{
                                if(res.status==200){
                                    message.success('课程封面修改成功！')
                                    this.props.getAllCourse()
                                }
                            })

                        }}
                        style={{
                            width:'80px',
                            height:'40px',
                            opacity:0,
                            position:'absolute',
                            top:0,
                            zIndex:1
                        }}
                    />
                </div>
            )
        },{
            title: '教师照片',
            dataIndex: 'courseTeacherImage',
            key: 'courseTeacherImage',
            width: '150px',
            render: (text,record) => (
                <div style={{position:'relative',top:-10}}>
                    <img
                        style={{
                            width:'80px',
                            height:'40px',
                            position:'absolute',
                            top:0,
                            left:0
                        }}
                        src={record?record.courseTeacherImage:null}
                    ></img>,
                    <input
                        type="file"
                        accept="image/*"
                        onClick={(e)=>{
                            e.stopPropagation()
                        }}
                        onChange={(e)=>{
                            let formData=new FormData
                            formData.append('courseId',record.courseId)
                            formData.append('imageName','courseTeacherImage')
                            formData.append('file',e.target.files[0])
                            axios.post(Api.UPDATE_IMAGE,formData,{
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res=>{
                                if(res.status==200){
                                    message.success('教师照片修改成功！')
                                    this.props.getAllCourse()
                                }
                            })
                            
                        }}
                        style={{
                            width:'80px',
                            height:'40px',
                            opacity:0,
                            position:'absolute',
                            top:0,
                            zIndex:1
                        }}
                    />
                </div>
                )

        }, {
            title: '操作',
            key: 'action',
            width: '410px',
            render: (text, record) => (
                <div>
                    <Popconfirm title="确定要删除该条数据吗?" onConfirm={(e)=>{
                        e.stopPropagation()
                        axios.delete(Api.DELETE_COURSE_INFO+'?courseId='+record.courseId).then(res=>{
                            if(res.data.success){
                                message.success('课程信息删除成功！')
                                this.props.getAllCourse()
                            }
                        })
                    }} onCancel={(e)=>{
                        e.stopPropagation()
                    }} okText="Yes" cancelText="No">
                        <a href="#" style={{marginRight:'10px'}} onClick={(e)=>{
                            e.stopPropagation()
                        }}>delCourse</a>
                    </Popconfirm>
                    <a href="#" style={{marginRight:'10px'}} onClick={(e)=>{
                        e.stopPropagation()
                        this.props.showAddPlan(record)
                    }}>addPlan</a>
                    <a href="#" style={{marginRight:'10px'}}  onClick={(e)=>{
                        e.stopPropagation()
                        this.props.showAddMedia(record)
                    }}>addMedia</a>
                    <Button type='primary' onClick={(e)=>{
                        e.stopPropagation()
                        this.releaseChange(1,record)
                    }}>发布</Button>
                    <Button type='danger' onClick={(e)=>{
                        e.stopPropagation()
                        this.releaseChange(0,record)
                    }}>下架</Button>
                </div>


            ),
        }];
        return (
            <div>
                <Table columns={columns} dataSource={this.state.courseList} onRow={(record) => ({
                    onClick: (event) => {
                        this.props.showInfoDrawer(record)
                    }
                })}/>

            </div>
        );
    }
    releaseChange=(status,record)=>{
        let body={
            courseId:record.courseId,
            status
        }
        axios.post(Api.UPDATE_COURSE,body).then(res=>{
            if(res.data.success){
                message.success('操作成功！')
            }else{
                message.error('操作失败请重试！')
            }
        })

    }
}

export default CourseList;