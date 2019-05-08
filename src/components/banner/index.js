import React, {Component} from 'react';
import {Button, Card, Divider,Upload,Icon,message,Switch,Modal} from "antd";
import {connect} from 'react-redux'
import * as actionCreators from '../../store/banner/actionCreators'
import EasyDragSort from '../../common/drag/EasyDragSort'
import axios from 'axios'
import * as API from '../../api'
let bannerName=''

class Banner extends Component {
    state={
        bannerName:'',
        curMoveItem: null,
        list: [],
        visible: false
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        let formdata = new FormData
        formdata.append('file',this.state.file)
        formdata.append('orderBy',this.state.orderBy?this.state.orderBy:1)
        formdata.append('bannerDesc',this.state.bannerDesc)
        formdata.append('status',this.state.status?'1':'0')
        axios.post(API.DELETE_BANNER,formdata,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            if(res.data.success){
                this.props.getAllBanner()
                message.success('添加banner成功！')
            }
        })
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    componentDidMount() {
        this.props.getAllBanner()
    }
    deleteBanner=(id)=>{
        axios.delete(API.DELETE_BANNER+'/'+id).then(res=>{
            if(res.data.success){
                this.props.getAllBanner()
                message.success('删除成功！')
            }
            
        })
    }
    handleDragMove = (data, from, to) => {
        this.setState({
            curMoveItem: to,
            list: data
        })
    }

    handleDragEnd = ()=>{
        this.setState({
            curMoveItem: null
        })
    }
    render() {
        const props = {
            action: 'http://52.83.225.97:9090/bannerManage/banner',
            listType: 'picture',
            defaultFileList: [],
            beforeUpload:(file)=>{
                this.setState({bannerName:file.name})
            },
            onChange:(info)=>{
                if (info.file.status !== 'uploading') {
                    this.props.getAllBanner()
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 文件上传成功！`);
                    this.props.getAllBanner()
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name}文件上传失败.`);
                }
            }
        };
        return (
            <div  className="bannerList-container">
                <Card title="banner" bordered={ false } style={{ width: '100%' }}>
                    <Button type="primary" onClick={this.showModal}>
                        新增banner
                    </Button>
                    <Modal
                        title="新增banner"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        暂不发布<Switch onChange={(info)=>{this.setState({status:info})}}/>发布
                        <br/>
                        排序字段<input style={{width:'200px',height:"30px"}} type="text" ref={node=>this.orderBy=node}  onChange={()=>{this.setState({orderBy:this.orderBy.value})}}/>
                        <br/>
                        上传图片<input type="file" ref={node=>this.imageFile=node} onChange={()=>{this.setState({file:this.imageFile.files[0],bannerDesc:this.imageFile.files[0].name})}}
                    />
                    </Modal>
                    {/*<Upload {...props} data={{bannerDesc:this.state.bannerName}}>
                        <Button>
                            <Icon type="upload" />上传图片
                        </Button>
                    </Upload>*/}
                    <Divider/>
                    <ul className='bannerBox'>
                        {this.props.bannerList?this.props.bannerList.map(item=>{
                            return (
                                <li className='bannerImgBox' key={item.bannerId}>
                                    <div className="buttonBox">
                                        <Button type='danger' onClick={()=>{this.deleteBanner(item.bannerId)}}>删除</Button>
                                        <Switch onChange={(info)=>{this.displayStatus(item.bannerId,info)}}/>发布
                                        <Button type='default' onClick={()=>{this.orderByTop(item.bannerId)}}>置顶</Button>
                                    </div>
                                    <img  key={item.bannerId}  src={item.bannerImage}/>
                                </li>
                            )
                        }):null}
                    </ul>

                </Card>
            </div>
        );
    }
    displayStatus=(bannerId,status)=>{
        let data={
            bannerId,
            status:status?1:0
        }
        axios.put(API.DELETE_BANNER,data).then(res=>{
            if(res.data.success){
                this.props.getAllBanner()
                message.success('操作成功')
            }
        })
    }
    orderByTop=(bannerId)=>{
        let data={
            bannerId,
            orderBy:1
        }
        axios.put(API.DELETE_BANNER,data).then(res=>{
            if(res.data.success){
                this.props.getAllBanner()
                message.success('置顶成功！')
            }
        })
    }
}

export default connect((state)=>({
    bannerList:state.banner.bannerList
}),(dispatch)=>({
    getAllBanner(){
        dispatch(actionCreators.getAllBanner())
    }
}))(Banner);