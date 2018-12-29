import React, {Component} from 'react';
import {actionCreators} from '../../components/news/store'
import {connect} from 'react-redux'
// import {actionCreator} from '../../store'
class Login extends Component {
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
                            <input type="password" placeholder='请输入管理员密码' onChange={(e)=>{this.inputPassword(e)}}/>
                            <svg className='icon-svg'>
                                <use xlinkHref='#icon-password_icon'></use>
                            </svg>
                        </div>
                    </div>
                    <div className="login-btn" onClick={()=>{
                        this.props.login({username:this.state.username,password:this.state.password})
                        if(this.props.login){
                            window.location.href='/news'
                        }
                    }}>登陆</div>
                </div>
            </div>
        );
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