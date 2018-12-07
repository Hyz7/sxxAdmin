import React,{Component,Fragment} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import Home from '../components/home'
import About from '../components/about'
export default ()=>(
    <div>
        <Route path='/' exact component={Home}></Route>
        <Route path='/about' exact component={About}></Route>
    </div>
)