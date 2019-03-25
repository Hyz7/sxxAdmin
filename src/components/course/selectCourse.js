import React, {Component} from 'react';
import axios from 'axios'
import uniqueId from 'lodash/uniqueId'
import * as API from '../../api'
import {Tree, Modal, Button, Icon, Upload} from 'antd'
const { TreeNode } = Tree;

const list=[]
const teachplanId=''

class SelectCourse extends Component {
    state={
        courseList:[],
        visible: false
    }

    showAddMedia = (record) => {
        this.setState({
            visible: true,
            courseId: record.courseId
        },()=>{
            axios.get(API.COURSE_CATALOGUE+'?courseId='+this.state.courseId).then(res=>{
                list.length=0
                list.push(res.data)
                this.setState({courseList:res.data.children})
            })
        });

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

    uploadMedia=(id)=>{
        this.setState({
            teachplanId:id
        })
        /*this.teachplanId=id
        console.log(this.teachplanId)*/
    }

    render() {
        const props = {
            action: 'http://192.168.0.102:31400/media/upload/uploadMediaData?courseId='+this.state.courseId+'&&teachplanId='+this.state.teachplanId,
            onChange({ file, fileList }) {
                if (file.status !== 'uploading') {
                    console.log(file, fileList);
                }
            },
            defaultFileList: [],
        };
        return (
            <Modal
                title="课程目录"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Tree
                    defaultExpandParent={true}
                    onSelect={(selectedKeys,e)=>{
                        if(e.selectedNodes[0].props.id){
                            this.uploadMedia(e.selectedNodes[0].props.id)
                        }
                    }}
                >
                    {this.renderTreeNodes(list)}
                </Tree>
                {this.state.teachplanId?
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" />上传视频
                        </Button>
                    </Upload>
                    :null
                }
            </Modal>

        );
    }
}

export default SelectCourse;