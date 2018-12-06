import React,{Component,Fragment} from 'react'
import { NavLink,Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../icons/iconfont'
import { CSSTransition } from 'react-transition-group';
class Header extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render() {

        return(
            <Fragment>
            </Fragment>
        )
    }
}

const mapStateToProps=(state)=>({
    menuList:state.header.menuLeftList,
    menuLeftShow:state.header.menuLeftShow
})

export default withRouter(connect(mapStateToProps,null)(Header))