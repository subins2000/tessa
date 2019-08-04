import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import { isLoggedIn, userStore } from './store.js';

import AddTorrent from './components/AddTorrent.js';
import Home from './components/Home.js';
import NotFound from './components/NotFound.js';
import Search from './components/Search.js';

import './components/css/App.css';

function App() {
  return (
    <Router>
        <div className="app">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/addtorrent" component={AddTorrent} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
