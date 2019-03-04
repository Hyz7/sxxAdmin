import React from 'react'
import ReactDom from 'react-dom'
import store from "./store";
import {BrowserRouter, Route ,Switch,Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import './style/entry.less'
import 'react-quill/dist/quill.snow.css'
import './common/icons/iconfont';
import Login from "./common/login";
import NotFound from './components/noFound'

import Page from './routes/page'
const App=()=>(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/login" component={Login}></Route>
                登录权限控制组件
                <Route path='/sxx' component={Page}></Route>
                <Route path="/404" component={NotFound} />
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </Provider>
)

ReactDom.render(<App />,document.getElementById('root'))