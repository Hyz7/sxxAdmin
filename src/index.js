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
import News from './components/news'
import 'react-quill/dist/quill.snow.css';
import Industry from "./components/industryDynamic";
import Student from "./components/stuDynamic";
const App=()=>(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Layout>
                    <Sider className='sider-container'>
                        <Menusider />
                    </Sider>
                    <Layout>
                        <Header>
                            <MyHeader />
                        </Header>
                        <Content>
                            {/*<Route path='/' component={ MainRoutes }></Route>*/}
                            <Route exact path="/" render={() => <Redirect to="/news" push />} />
                            <Route path='/news' component={News}></Route>
                            <Route path='/industry' component={Industry}></Route>
                            <Route path='/study' component={Student}></Route>
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