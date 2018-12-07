import React,{Component,Fragment} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import Home from '../components/home'
import About from '../components/industryDynamic'
import Abc from '../components/stuDynamic'
export default ()=>(
    <div>
        <Route path='/' exact component={Home}></Route>
        <Route path='/industryDynamic' exact component={About}></Route>
        <Route path='/stuDynamic' exact component={Abc}></Route>
    </div>
)