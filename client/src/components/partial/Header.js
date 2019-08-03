import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import web3Obj from '../../helper';
import { isLoggedIn, userStore } from '../../store.js';


class Header extends Component {

    constructor(props){
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    enableTorus = () => {
        window.ethereum.enable().then(accounts => {
          window.sessionStorage.setItem('pageUsingTorus', 'true')

          userStore.dispatch({
            type: 'USER_SET_INFO',
            account: accounts[0]
          });
        });
    }

    logOut() {
        userStore.dispatch({
            type: 'USER_LOG_OUT',
        });
    }

    userButtons() {
        var name = userStore.getState()['name'];
        var profileLink = '/u/' + userStore.getState()['username'];

        return (
            <div className="dropdown">
                <Link className="btn btn-primary" to={profileLink}>{name}</Link>&nbsp;
                <Link className="btn btn-light" to="/" onClick={this.logOut}>Log Out</Link>
            </div>
        );
    }

    guestUserButtons() {
        return (
            <span>
                <Link onClick={this.enableTorus} className="btn btn-primary" to="#">Log In</Link>&nbsp;
                <Link className="btn btn-light" to="/register">Register</Link>
            </span>
        );
    }

    render() {
        var userControlButtons;

        if (isLoggedIn()) {
            userControlButtons = this.userButtons();
        } else {
            userControlButtons = this.guestUserButtons();
        }

        return (
            <nav className="navbar navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Tessa</Link>
                <form className="form-inline my-2 my-lg-0">
                    {userControlButtons}
                </form>
            </nav>
        );
    }
}

export default Header;
