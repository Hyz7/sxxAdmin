import React, {Component} from 'react';
import {Button, Card, Table, Divider, Tag, Pagination,Modal,Select,DatePicker  } from "antd";
import {connect} from 'react-redux'
import * as actionCreators from '../home/store/actionCreators'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { MonthPicker, RangePicker } = DatePicker;
class Home extends Component {
    state={
        visible: false,
        content: ''
    }

    componentDidMount(){
        if (!this.props.newsList.length) {
            this.props.getNewsList(1,1,10)
        }
    }
    onChange=(date, dateString) =>{
        console.log(date, dateString);

    }
    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.newsList !== nextProps.newsList;
    }*/

    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            width: 350,
            minWidth:350,
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '内容',
            dataIndex: 'content',
            width: 350,
            render: text => <div>{text.substring(0,200)+'......'}</div>,
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 150
        }, {
            title: '展示图片',
            dataIndex: 'image',
            width:250,
            render: url => <img src={url} style={{width:'200px',height:'200px'}}/>,
        }, {
            title: '分类名称',
            dataIndex: 'typeName',
            width:150
        }, {
            title: '操作',
            dataIndex: 'make',
            width:300,
            render: (text, record) => {
                return (
                    <span>
                  <Button type="dashed">修改</Button>
                  <Divider type="vertical" />
                  <Button type="danger">删除</Button>
                </span>
                )
            },
        }];
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        const modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
        }
        const  formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]
        return (
            <div>
                <Modal title="Basic Modal" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       className='modal-container'
                >
                    <div className="input-box">
                        <div className="text">标题:</div><input type="text" className="input-style title" ref={input=>this.textInput=input} onChange={()=>{this.inputChange()}}/>
                    </div>

                    <div className="input-box">
                        <div className="text">创建时间:</div><DatePicker ref={input=>this.timeInput=input} onChange={(date, dateString)=>this.onChange(date, dateString)} />
                    </div>
                    <div className="input-box">
                        <div className="text">分类:</div>
                        <Select placeholder="请选择分类"  className='select'>
                            <Option value="news">新闻资讯</Option>
                            <Option value="industry">行业动态</Option>
                            <Option value="student">学员动态</Option>
                        </Select>
                    </div>
                    <div className="input-box">
                        <div className="text">图片:</div><input type="file" className="input-style image" placeholder='上传封面图片'/>
                    </div>
                    <div className="input-box">
                        <div className="text">内容:</div><ReactQuill value={this.state.content}
                                    onChange={this.handleChange}
                                    modules={modules}
                        />
                    </div>
                </Modal>
                <Card title="新闻资讯">
                    <Button type="primary" className='primary' onClick={()=>{this.showModal()}}>新增</Button>
                    <Button type="dashed" className='primary'>修改</Button>
                    <Button type="danger">删除</Button>
                </Card>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.newsList} rowKey={(newsList)=>newsList.id} key={this.props.newsList.id} pagination={false} />
                <Pagination onChange={(page,pageSize)=>{
                    this.props.getNewsList(1,page,pageSize)
                }} defaultCurrent={1} total={50} style={{float:'right',marginTop:'20px'}} />
            </div>
        );
    }
    inputChange=(e)=>{
        console.log(this.timeInput.value)
        this.setState({
            title:this.textInput.value,
            createTime:this.timeInput.value,

        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        let { content }=this.state
        let body={
            typeId:1,
            content
        }
        this.props.uploadEditor(body)
        this.setState({visible: false});
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    handleChange=(value)=>{
        this.setState({ content: value })
    }

}

const mapStateToProps=(state)=>({
    newsList:state.home.newsList
})

const mapDispatchToProps=(dispatch)=>({
    getNewsList(id,page,pageSize){
        dispatch(actionCreators.getNewsList(id,page,pageSize))
    },
    uploadEditor(body){
        dispatch(actionCreators.uploadEditor(body))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);
