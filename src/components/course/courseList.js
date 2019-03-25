import React, {Component} from 'react';
import { message, Popconfirm, Table,Modal} from "antd";
import axios from "axios";
import * as Api from "../../api";

class CourseList extends Component {
    constructor(props){
        super(props)
        this.state = {
            courseList:props.courseList,
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
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '课程描述',
            dataIndex: 'courseSubTitle',
            key: 'courseSubTitle',
            width: '200px'
        }, {
            title: '折扣价格',
            dataIndex: 'courseActivityPrice',
            key: 'courseActivityPrice',
        },{
            title: '原价',
            dataIndex: 'courseOriginalPrice',
            key: 'courseOriginalPrice',
        }, {
            title: '操作',
            key: 'action',
            width: '300px',
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
                    <a href="#" onClick={(e)=>{
                        e.stopPropagation()
                        this.props.showAddMedia(record)
                    }}>addMedia</a>
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
}

export default CourseList;