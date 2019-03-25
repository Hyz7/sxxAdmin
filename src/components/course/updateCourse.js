import React, {Component} from 'react';
import {Button, Col, Drawer, Row, Select, Form, Input, DatePicker, message} from "antd";
import connect from "react-redux/es/connect/connect";
import * as actionCreators from "../../store/course/actionCreators";
import ReactQuill from 'react-quill';
import axios from "axios";
import * as Api from "../../api";
const { RangePicker } = DatePicker;
class UpdateCourse extends Component {
    constructor(props){
        super(props)
        this.state={
            content:'',
            courseInfo:this.props.courseInfo
        }
    }
    onChange=(date, dateString)=> {
        console.log( dateString);
    }

    clearData=()=>{
        this.setState({
            courseTitle:'',
            courseSubTitle:'',
            courseImage:'',
            courseTeacherImage:'',
            courseTeacher:'',
            courseTeacherIntroduce:'',
            courseWatchCount:'',
            courseOriginalPrice:'',
            courseActivityPrice:'',
            introduce:'',
            content:''
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({courseInfo: nextProps.courseInfo});
    }

    handleChange=(value)=>{
        this.setState({ content: value })
    }

    render() {
        let courseInfo = this.state.courseInfo
        const modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
        }
        return (
            <div>
                <Drawer
                    title="更改课程信息"
                    width={720}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                    style={{
                        overflow: 'auto',
                        height: 'calc(100% - 108px)',
                        paddingBottom: '108px',
                    }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="课程标题">
                                    <Input placeholder={courseInfo.courseTitle}
                                           onChange={(e)=>{this.setState({courseTitle:e.target.value})}}
                                           ref={node=>this.courseTitle=node}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="课程副标题">
                                    <Input placeholder={courseInfo.courseSubTitle}
                                           onChange={(e)=>{this.setState({courseSubTitle:e.target.value})}}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="授课老师">
                                    <Input placeholder={courseInfo.courseTeacher}
                                           // defaultValue={courseInfo.courseTeacher}
                                           onChange={(e)=>{this.setState({courseTeacher:e.target.value})}}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="授课老师介绍">
                                    <Input placeholder={courseInfo.courseTeacherIntroduce}
                                           // defaultValue={courseInfo.courseTeacherIntroduce}
                                           onChange={(e)=>{this.setState({courseTeacherIntroduce:e.target.value})}}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="课程封面">
                                    <input accept="image/*" type='file'
                                           ref={node=>this.courseImage=node}
                                           onChange={()=>{
                                               this.setState({courseImage:this.courseImage.files[0]},()=>{console.log(this.state.courseImage)})
                                           }}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="授课老师照片">
                                    <input type='file'
                                           ref={node=>this.courseTeacherImage=node}
                                           onChange={()=>{
                                               // this.getTeacherImg(this.courseTeacherImage)
                                               this.setState({courseTeacherImage:this.courseTeacherImage.files[0]})
                                           }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="课程优惠时间">
                                    <RangePicker onChange={this.onChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="课程观看次数">
                                    <Input placeholder={courseInfo.courseWatchCount}
                                           // defaultValue={courseInfo.courseWatchCount}
                                           onChange={(e)=>{this.setState({courseWatchCount:e.target.value})}}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="课程原价">
                                    <Input placeholder={courseInfo.courseOriginalPrice}
                                           // defaultValue={courseInfo.courseOriginalPrice}
                                           onChange={(e)=>{this.setState({courseOriginalPrice:e.target.value})}}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="课程折扣价">
                                    <Input placeholder={courseInfo.courseActivityPrice}
                                           // defaultValue={courseInfo.courseActivityPrice}
                                           onChange={(e)=>{this.setState({courseActivityPrice:e.target.value})}}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="介绍">
                                    <Input.TextArea
                                        rows={4}
                                        // placeholder={courseInfo.introduce}
                                        // defaultValue={courseInfo.introduce}
                                        onChange={(e)=>{this.setState({introduce:e.target.value})}}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="课程介绍">
                                    <ReactQuill  value={this.state.content}
                                                 onChange={this.handleChange}
                                                 modules={modules}
                                    />
                                    {/*<Input placeholder="请修改课程详情" defaultValue={courseInfo.courseIntroduce} />*/}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={()=>{this.clearData();this.props.onClose()}} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button onClick={()=>{
                            this.saveCourseDetail(this.props.courseInfo)
                            this.clearData()
                        }} type="primary">
                            保存
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }

    saveCourseDetail=(courseInfo)=>{

        let formData=new FormData
        formData.append('courseId',this.state.courseInfo.courseId)
        formData.append('courseTitle',this.state.courseTitle?this.state.courseTitle:courseInfo.courseTitle)
        formData.append('courseSubTitle',this.state.courseSubTitle?this.state.courseSubTitle:courseInfo.courseSubTitle)
        formData.append('courseTeacher',this.state.courseTeacher?this.state.courseTeacher:courseInfo.courseTeacher)
        formData.append('courseTeacherIntroduce',this.state.courseTeacherIntroduce?this.state.courseTeacherIntroduce:courseInfo.courseTeacherIntroduce)
        formData.append('courseWatchCount',this.state.courseWatchCount?this.state.courseWatchCount:courseInfo.courseWatchCount)
        formData.append('courseOriginalPrice',this.state.courseOriginalPrice?this.state.courseOriginalPrice:courseInfo.courseOriginalPrice)
        formData.append('courseActivityPrice',this.state.courseActivityPrice?this.state.courseActivityPrice:courseInfo.courseActivityPrice)
        formData.append('courseTeacherImage',this.state.courseTeacherImage?this.state.courseTeacherImage:'')
        formData.append('courseImage',this.state.courseImage?this.state.courseImage:'')
        formData.append('introduce',this.state.introduce?this.state.introduce:courseInfo.courseTitle)
        formData.append('courseIntroduce',this.state.content?this.state.content:courseInfo.content)

        axios.post(Api.UPDATE_COURSE,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            if(res.data.success){
                message.success('课程信息修改成功！')
                this.props.getAllCourse()
                this.clearData()
            }
        })
        this.props.onClose()
    }

}
export default connect(null,(dispatch)=>({
    updateCourse(body){
        dispatch(actionCreators.updateCourse(body))
    },
    getAllCourse(){
        dispatch(actionCreators.getAllCourse())
    }
}))(Form.create()(UpdateCourse));
