import React, {Component} from 'react';
import {Button, Drawer, Form, Input, message} from "antd";
import connect from "react-redux/es/connect/connect";
import * as actionCreators from "../../store/course/actionCreators";
import axios from "axios";
import * as Api from "../../api";

class AddCourse extends Component {
    constructor(props){
        super(props)
        this.state = {
            courseTitle:'',
            courseSubTitle:'',
            courseActivityPrice:'',
            courseOriginalPrice:'',
            courseImage:''
        };
    }

    render() {
        return (
            <div>
                <Drawer
                    title="新增课程"
                    placement="right"
                    closable={false}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                >
                    <div className="inputCourseInfo">
                        <div className="inputBox">
                            <div className="title">课程名称 :</div>
                            <Input type="text" className='inputName' ref={node=>this.courseTitle=node} onChange={(e)=>{
                                this.setState({courseTitle:e.target.value})
                            }}/>
                        </div>
                        <div className="inputBox">
                            <div className="title">课程描述 :</div>
                            <Input type="text" className='inputDesc'  ref={node=>this.courseSubTitle=node} onChange={(e)=>{
                                this.setState({courseSubTitle:e.target.value})}}
                            />
                        </div>
                        <div className="inputBox">
                            <div className="title">折扣价格 :</div>
                            <Input type="text" className='inputDiscount' ref={node=>this.courseActivityPrice=node} onChange={(e)=>{
                                this.setState({courseActivityPrice:e.target.value})}}/>
                        </div>
                        <div className="inputBox">
                            <div className="title">课程原价 :</div>
                            <Input type="text" className='inputOriginal' ref={node=>this.courseOriginalPrice =node} onChange={(e)=>{
                                this.setState({courseOriginalPrice:e.target.value})}}/>
                        </div>
                        <div className="inputBox">
                            <div className="title">课程封面图 :</div>
                            <input accept="image/*" name="img" id="upload_file" type="file"
                                   onChange={()=>{this.getImg(this.addImage)}}
                                   ref={img=>this.addImage=img}
                            />
                        </div>
                    </div>
                    <div className="btn-container">
                        <Button type='primary' onClick={()=>this.saveCourseInfo()}>保存</Button>
                        <Button type='danger' onClick={()=>{this.props.onClose()}}>取消</Button>
                    </div>
                </Drawer>
            </div>
        );
    }
    getImg=(dom)=>{
        this.setState({courseImage:dom.files[0]})
    }
    saveCourseInfo=()=>{
        let formData = new FormData()
        formData.append('courseTitle', this.state.courseTitle)
        formData.append('courseSubTitle', this.state.courseSubTitle)
        formData.append('courseActivityPrice', this.state.courseActivityPrice)
        formData.append('courseOriginalPrice', this.state.courseOriginalPrice)
        formData.append('courseImage', this.state.courseImage)
        // this.props.addCourseInfo(formData)
        axios.post(Api.ADD_COURSE_INFO,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            if(res.data.success){
                message.success('保存成功！')
                this.props.getAllCourse()
                this.props.onClose()
            }else{
                message.error('保存失败，请重试！')
            }
        })
    }
}

export default connect(null,(dispatch)=>({
    getAllCourse(){
        dispatch(actionCreators.getAllCourse())
    },
    addCourseInfo(body){
        dispatch(actionCreators.addCourseInfo(body))
    }
}))(Form.create()(AddCourse));
