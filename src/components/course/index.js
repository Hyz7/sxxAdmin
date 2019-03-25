import React, {Component} from 'react';
import {Card , Button, Divider, Form} from 'antd';
import CourseList from './courseList'
import SelectCourse from './selectCourse'
import AddPlan from './addPlan'
import AddCourse from './addCourse'
import UpdateCourse from './updateCourse'
import {connect} from 'react-redux'
import * as actionCreators from '../../store/course/actionCreators'

class CourseUpload extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            visibleInfo:false,
            courseInfo:{}
        };
    }

    componentDidMount() {
        this.props.getAllCourse()
        // this.showAddPlan()
    }

    showAddPlan=(record)=>{
        this.addPlan.showAddPlanModal(record)
    }

    showAddMedia=(record)=>{
        this.addMedia.showAddMedia(record)
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    showInfoDrawer = (record) => {
        this.setState({
            visibleInfo: true,
            courseInfo:record
        });
    };

    onInfoClose = () => {
        this.setState({
            visibleInfo: false,
        });
    };

    render() {
        return (
            <div>
                <Card title="创建课程" bordered={ false } style={{ width: '100%' }}>
                    <Button type="primary" onClick={ this.showDrawer }>新增课程</Button>
                    <Divider/>
                    <CourseList
                        courseList={this.props.courseList}
                        showInfoDrawer={(record)=>this.showInfoDrawer(record)}
                        getAllCourse={()=>{this.props.getAllCourse()}}
                        showAddPlan={(record)=>this.showAddPlan(record)}
                        showAddMedia={(record)=>this.showAddMedia(record)}
                    />

                    <AddCourse
                        onClose={()=>this.onClose()}
                        visible={this.state.visible}
                    />

                    <UpdateCourse
                        onClose={()=>{this.onInfoClose()}}
                        visible={this.state.visibleInfo}
                        courseInfo={this.state.courseInfo}
                    />

                    <AddPlan
                        ref={node=>this.addPlan=node}
                    />

                    <SelectCourse
                        ref={node=>this.addMedia=node}
                    />
                </Card>
            </div>
        );
    }
}

export default connect((state)=>({
    courseList:state.course.courseList
}),(dispatch)=>({
    getAllCourse(){
        dispatch(actionCreators.getAllCourse())
    }
}))(Form.create()(CourseUpload));