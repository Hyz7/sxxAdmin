import React,{Component,Fragment} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import News from '../components/news'
import About from '../components/industryDynamic'
import Abc from '../components/stuDynamic'
export default ()=>(
    <div>
        <Route path='/news' exact component={News}></Route>
        <Route path='/industryDynamic' exact component={About}></Route>
        <Route path='/stuDynamic' exact component={Abc}></Route>
    </div>
)
