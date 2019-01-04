import React,{Component,Fragment} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import AuthRouter from './AuthRouter'
import Login from '../common/login'
import News from '../components/news'
import Industry from '../components/industryDynamic'
import Student from '../components/stuDynamic'
import Download from "../components/download";
export default ()=>(
    <div>
        {/*<Route path="/" exact component={Login}></Route>
        <Route path="/login" component={Login}></Route>
        登录权限控制组件
        <AuthRouter path='/main' component={Home}></AuthRouter>*/}

        <Route path='/news' component={News}></Route>
        <Route path='/industry' component={Industry}></Route>
        <Route path='/study' component={Student}></Route>
        <Route path='/download' component={Download}></Route>
    </div>
)
