import axios from 'axios';
import React, { Component } from 'react';
import toastr from 'toastr';

import { isLoggedIn, userStore } from '../store.js';
import Header from './partial/Header.js';

import 'toastr/build/toastr.min.css';


class Login extends Component {

    state = {
        account: ''
    }

    constructor(props){
        super(props);

        if (isLoggedIn()) {
            this.props.history.push('/');
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();

        var $this = this;

        axios.get('/api/users/login', {
            auth: {
                username: this.state.inputUsername,
                password: this.state.inputPassword,
            }
        }).then(function(response) {
            var token = response.data.token;

            if (response.status === 200) {
                userStore.dispatch({
                    type: 'USER_SET_INFO',
                    authToken: token,
                    name: response.data.name,
                    username: response.data.username,
                });

                toastr.info('Logged in !');
                $this.props.history.push('/');
            }

        }).catch(function (error) {
            if (typeof error.response.data.detail !== 'undefined') {
                toastr.info(error.response.data.detail);
            } else {
                console.log(error);
            }
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <h1>Login</h1>
                    <p>Login to add torrents</p>
                    <button onClick={this.enableTorus} type="submit" className="btn btn-primary icon">Login With Torus</button>
                </div>
            </div>
        );
    }
}

export default Login;
