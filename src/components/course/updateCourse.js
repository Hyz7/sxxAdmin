import React, {Component} from 'react';
import { Button, Col, Drawer, Row, Select,Form ,Input,DatePicker} from "antd";
import connect from "react-redux/es/connect/connect";
import * as actionCreators from "../../store/course/actionCreators";
import ReactQuill from 'react-quill';
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
        console.log(date, dateString);
    }

    handleChange=(value)=>{
        this.setState({ content: value })
    }

    /*componentWillUpdate() {
        this.setState({courseInfo:this.props.courseInfo})
    }*/
    componentWillReceiveProps(nextProps){
        this.setState({nextProps:this.props.courseInfo})
    }
    render() {
        let {courseInfo} = this.state
        // console.log(this.props.courseInfo)
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
                                    <Input placeholder="请修改课程名称" defaultValue={courseInfo.courseTitle} onChange={(e)=>{
                                        this.setState({courseTitle:e.target.value})
                                    }}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="课程副标题">
                                    <Input placeholder="请修改课程副标题" defaultValue={courseInfo.courseSubTitle} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="授课老师">
                                    <Input placeholder="请修改授课老师" defaultValue={courseInfo.courseTeacher} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="授课老师介绍">
                                    <Input placeholder="请修改课程详情" defaultValue={courseInfo.courseTeacherIntroduce} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="课程封面">
                                    <Input type='file'/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="授课老师照片">
                                    <Input type='file' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="课程优惠时间">
                                    <RangePicker onChange={()=>this.onChange()} />
                                    {/*<Input placeholder="请修改课程名称" defaultValue={courseInfo.coursePreferentialTime} />*/}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="课程观看次数">
                                    <Input placeholder="请修改课程详情" defaultValue={courseInfo.courseWatchCount} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="课程原价">
                                    <Input placeholder="请修改课程名称" defaultValue={courseInfo.courseOriginalPrice} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="课程折扣价">
                                    <Input placeholder="请修改课程详情" defaultValue={courseInfo.courseActivityPrice} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="介绍">
                                    <Input.TextArea  rows={4} placeholder="请修改课程介绍" defaultValue={courseInfo.introduce} />
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
                        <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button onClick={()=>{
                            this.saveCourseDetail(courseInfo.courseId)
                        }} type="primary">
                            保存
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
    saveCourseDetail=(id)=>{
        const body={
            courseId:id,
            courseTitle:this.state.courseTitle
        }

        this.props.addCourseInfo(body)
        this.props.onClose()
    }

}
export default connect(null,(dispatch)=>({
    updateCourse(){
        dispatch(actionCreators.updateCourse())
    },
    getAllCourse(){
        dispatch(actionCreators.getAllCourse())
    },
    addCourseInfo(body){
        dispatch(actionCreators.addCourseInfo(body))
    }
}))(Form.create()(UpdateCourse));
