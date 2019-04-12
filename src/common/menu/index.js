import React, {Component} from 'react';
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
import {Link,NavLink} from 'react-router-dom'
class Menusider extends Component {
    state = {
        theme: 'dark',
        current: '1',
    }
    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div>
                <div className="header" style={{height:'64px',color:'#fff',fontSize:'20px',textAlign:'center',lineHeight:'64px'}}>思学行后台管理系统</div>
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 240 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="home" />首页轮播</span>}>
                        <Menu.Item key="10"><NavLink to='/sxx/home/banner' >banner列表</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="mail" />思学行动态</span>}>
                        <Menu.Item key="1"><NavLink to='/sxx/home/news' >新闻资讯</NavLink></Menu.Item>
                        <Menu.Item key="2"><NavLink to='/sxx/home/industry' >行业动态</NavLink></Menu.Item>
                        <Menu.Item key="3"><NavLink to='/sxx/home/study'>学员动态</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="appstore" />资料下载</span>}>
                        <Menu.Item key="5"><NavLink to='/sxx/home/download' >下载列表</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" />课程上传</span>}>
                        <Menu.Item key="10"><NavLink to='/sxx/home/courseUpload' >课程列表</NavLink></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default Menusider;
