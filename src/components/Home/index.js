import React, {Component} from 'react';
import {Button, Card, Table, Divider, Tag, Pagination,Modal } from "antd";
import {connect} from 'react-redux'
import * as actionCreators from '../home/store/actionCreators'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class Home extends Component {
    state={
        visible: false,
        content: ''
    }

    componentDidMount(){
        this.props.getNewsList(1,1,10)
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.newsList !== nextProps.newsList;
    }*/

    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            width: 350,
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '内容',
            dataIndex: 'content',
            width: 350,
            render: text => <div>{text.substring(0,200)+'......'}</div>,
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
        }, {
            title: '展示图片',
            dataIndex: 'image',
            width:200,
            render: url => <img src={url} style={{width:'200px',height:'200px'}}/>,
        }, {
            title: '分类名称',
            dataIndex: 'typeName',
        }, {
            title: '操作',
            dataIndex: 'make',
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
        const data = [{
            key: '1',
            title: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            title: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            title: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '4',
            title: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
            make :<Button type="dashed" className='primary'>修改</Button>,
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
                   <ReactQuill value={this.state.content}
                               onChange={this.handleChange}
                               modules={modules}
                   />

                </Modal>
                <Card title="新闻资讯">
                    <Button type="primary" className='primary' onClick={()=>{this.showModal()}}>新增</Button>
                    <Button type="dashed" className='primary'>修改</Button>
                    <Button type="danger">删除</Button>
                </Card>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.newsList?this.props.newsList:''} rowKey={this.props.newsList.id} pagination={false} />
                <Pagination onChange={(page,pageSize)=>{
                    this.props.getNewsList(1,page,pageSize)
                }} defaultCurrent={1} total={50} style={{float:'right',marginTop:'20px'}} />
            </div>
        );
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
