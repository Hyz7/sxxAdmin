import React,{Component,Fragment} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import News from '../components/news'
import Industry from '../components/industryDynamic'
import Student from '../components/stuDynamic'
export default ()=>(
    <div>
        <Route exact path="/" render={() => <Redirect to="/news" push />} />
        <Route path='/news' component={News}></Route>
        <Route path='/industry' component={Industry}></Route>
        <Route path='/study' component={Student}></Route>
    </div>
)
