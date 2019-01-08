import React from 'react'
import ReactDom from 'react-dom'
import store from "./store";
import {BrowserRouter, Route ,Switch,Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import MainRoutes from "./routes/index";
import './style/entry.less'
import Menusider from "./common/menu";
import {Layout} from "antd";
const { Header, Footer, Sider, Content } = Layout;
import MyHeader from './common/header'
import MyFooter from './common/footer'
import 'react-quill/dist/quill.snow.css'
import './common/icons/iconfont';
import Login from "./common/login";
import NotFound from './components/noFound'

// import News from "./components/news";
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