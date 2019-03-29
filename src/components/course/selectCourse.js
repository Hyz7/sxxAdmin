import React, {Component} from 'react';
import axios from 'axios'
import uniqueId from 'lodash/uniqueId'
import * as API from '../../api'
import {Tree, Modal, Button, Icon, Upload,message} from 'antd'
const { TreeNode } = Tree;

const listBox=[]
let list=[]
let teachplanId=''
class SelectCourse extends Component {
    state={
        courseList:[],
        visible: false,
        autoExpandParent:true
    }

    showAddMedia = (record) => {
        this.setState({
            visible: true,
            courseId: record.courseId
        },()=>{
            axios.get(API.COURSE_CATALOGUE+'?courseId='+this.state.courseId).then(res=>{
                listBox.length=0
                listBox.push(res.data)
                this.setState({courseList:listBox},()=>{
                    this.renderTree(this.state.courseList)
                })
            })
        });
    }
    renderTree=(courseList)=>{
        list.length=0
        courseList&&courseList[0].children?courseList.forEach(v=>{
            list.push({v1:v.pname})
            this.setState({courseName:v.pname})
            v.children.forEach((v2,index)=>{
                list.push({v2:v2.pname,index})
                v2.children.forEach((v3,index)=>{
                    list.push({v3:v3.pname,index,url:v3.mediaUrl,id:v3.id})
                })
            })
        }):null
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        list.length=0
    }

    componentWillMount() {}

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.pname} key={uniqueId()} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item}  title={item.pname} dataRef={item.pname} key={uniqueId()}/>;
    })

    render() {
        const props = {
            action: 'http://52.83.225.97:9090/media/upload/uploadMediaData',
            onChange({ file, fileList}) {
                if (file.status !== 'uploading') {
                    console.log(file, fileList);
                    if(file.response.success){
                        message.success('视频上传成功！')
                    }else{
                        message.error('视频上传失败，请重试！')
                    }
                }
            },
            showUploadList:false,
            defaultFileList: [],
        };
        return (
            <Modal
                title={list&&list.length?list[0].v1:''}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div className='tree-container'>
                    {list.length?list.map(item=>{
                        if(item.v2){
                            return (
                                <div  className='v2Style' key={uniqueId()}>
                                    <div className="titleName">章节{item.index+1}</div>
                                    {item.v2}
                                </div>
                            )
                        }
                        if(item.v3){
                            return (
                                <div className='v3Style' key={uniqueId()} onClick={()=>{
                                    teachplanId=item.id

                                }}>
                                    <Upload {...props} data={{courseId:this.state.courseId,teachplanId:item.id }}>
                                        <div
                                            className="titleName"
                                        >课时{item.index+1}________{item.v3}</div>
                                    </Upload>

                                </div>
                            )
                        }

                    }):<div>目录暂时未上传!</div>}
                </div>

            </Modal>

        );
    }
}

export default SelectCourse;