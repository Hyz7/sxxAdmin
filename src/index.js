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
import 'react-quill/dist/quill.snow.css';
import Login from "./components/login";

const App=()=>(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Layout>
                    <Sider className='sider-container'>
                        <Menusider />
                    </Sider>
                    <Layout>
                        <Header>
                            <MyHeader />
                        </Header>
                        <Content>
                            <MainRoutes/>
                        </Content>
                        <Footer>
                            <MyFooter />
                        </Footer>
                    </Layout>
                </Layout>
            </Switch>
        </BrowserRouter>
    </Provider>
)

ReactDom.render(<App />,document.getElementById('root'))