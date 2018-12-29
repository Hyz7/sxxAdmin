import React,{Component,Fragment} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import News from '../components/news'
import Industry from '../components/industryDynamic'
import Student from '../components/stuDynamic'
import Download from "../components/download";
export default ()=>(
    <div>
        {/*<Route exact path="/" render={() => <Redirect to="/login" push />} />*/}
        <Route path='/news' component={News}></Route>
        <Route path='/industry' component={Industry}></Route>
        <Route path='/study' component={Student}></Route>
        <Route path='/download' component={Download}></Route>
    </div>
)
