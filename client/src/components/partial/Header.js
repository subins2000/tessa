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

    setStateInfo = () => {
        web3Obj.web3.eth.getAccounts().then(accounts => {
            userStore.dispatch({
                type: 'USER_SET_INFO',
                account: accounts[0]
            });
        })
    }

    enableTorus = async () => {
        try {
            await web3Obj.initialize()
            this.setStateInfo()
        } catch (error) {
            console.error(error)
        }
    }

    logOut() {
        userStore.dispatch({
            type: 'USER_LOG_OUT',
        });
    }

    userButtons() {
        var name = sessionStorage.getItem('selectedAddress');
        var profileLink = '/u/' + name;

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
