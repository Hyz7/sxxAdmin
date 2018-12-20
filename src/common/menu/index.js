import React, {Component} from 'react';
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
import {Link} from 'react-router-dom'
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
                    <SubMenu key="sub1" title={<span><Icon type="mail" />思学行动态</span>}>
                        <Menu.Item key="1"><Link to='/news'>新闻资讯</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/industry'>行业动态</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/study'>学员动态</Link></Menu.Item>
                        {/*<Menu.Item key="4">Option 4</Menu.Item>*/}
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default Menusider;
