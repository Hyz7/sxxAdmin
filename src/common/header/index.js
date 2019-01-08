import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
class Index extends Component {
    logout=()=>{
        sessionStorage.setItem("isLogin","0");
        this.props.history.push('/login')
    }
    render() {
        return (
            <div style={{textAlign:'right',color:'#fff',cursor:'pointer'}} onClick={()=>{this.logout()}}>
                退出登录
            </div>
        );
    }
}

export default withRouter(Index);