import React, {Component} from 'react';
import {actionCreators} from '../../components/news/store/index'
import {connect} from 'react-redux'
// import {actionCreator} from '../../store'
import { message } from 'antd';
class Login extends Component {
    state={
        username:'',
        password:''
    }
    componentWillMount() {

    }

    componentDidMount() {}

    inputUsername=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

    inputPassword=(e)=>{
        this.setState({
            password:e.target.value
        })
    }

    render() {
        return (
            <div className='login-container'>
                <div className="login-box">
                    <img src={require("../../asset/image/logo.png")} alt=""/>
                    <div className="login-input">
                        <div className="input-box">
                            <input type="text" placeholder='请输入管理员账户名' onChange={(e)=>{this.inputUsername(e)}}/>
                            <svg className='icon-svg'>
                                <use xlinkHref='#icon-yonghuming'></use>
                            </svg>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='请输入管理员密码' onKeyDown={(e)=>{
                                if( e.keyCode===13){
                                    this.loginAuth(e)
                                }
                            }} onChange={(e)=>{this.inputPassword(e)}}/>
                            <svg className='icon-svg'>
                                <use xlinkHref='#icon-password_icon'></use>
                            </svg>
                        </div>
                    </div>
                    <div className="login-btn"  onClick={()=>{
                        this.loginAuth()
                    }}>登陆</div>
                </div>
            </div>
        );
    }
    loginAuth=(e)=>{
        const {username,password}=this.state

            if(username==='sxx'&&password==='sixuexing'){
                sessionStorage.setItem("isLogin","1");
                this.props.history.push('/sxx/home/news');
            }else{
                message.error('请输入正确的用户名与密码！');
            }

    }
}
const mapStateToProps=(state)=>({
    login:state.news.login
})
const mapDispatchToProps=(dispatch)=>({
    login(body){
        dispatch(actionCreators.login(body))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);