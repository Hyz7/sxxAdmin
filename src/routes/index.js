import React,{Component,Fragment} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import AuthRouter from './AuthRouter'

import Login from '../common/login'
import News from '../components/news'

export default ()=>(
    <div>
        <Route path="/" exact component={Login}></Route>
        <Route path="/login" component={Login}></Route>
        登录权限控制组件
        <AuthRouter path='/sxx/home' component={News}></AuthRouter>
    </div>
)
