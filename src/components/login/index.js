import React, {Component} from 'react';
import {Link} from 'react-router-dom'
class Login extends Component {

    render() {
        return (
            <div>
                <canvas id="canvas"></canvas>
                <Link to='/news'>
                    登陆
                </Link>
            </div>
        );
    }
}

export default Login;