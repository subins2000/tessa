import axios from 'axios';
import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import { isLoggedIn, userStore } from '../store.js';
import Header from './partial/Header.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import './css/Home.css';


class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            bookList: [],
        };

        this.bookSearchForm = React.createRef();

        this.onBookSearchFormSubmit = this.onBookSearchFormSubmit.bind(this);

        this.updateUserBooks();
    }

    updateUserBooks() {
        if (!isLoggedIn())
            return;

        axios.get('/api/books/list').then(function(response) {
            if (response.status === 200) {
                userStore.dispatch({
                    type: 'USER_SET_BOOKS',
                    books: response.data,
                });
            }
        });
    }

    onBookSearchFormSubmit(e) {
        e.preventDefault();

        var queryString = new URLSearchParams(new FormData(this.bookSearchForm['current'])).toString();

        this.props.history.push('/search?' + queryString);
    }

    intro() {
        return (
            <div className="container" id="content">
                <div className="intro row align-items-center">
                    <div className="col">
                        <center>
                            <h1>Tessa</h1>
                            <p>Search torrents</p>
                            <div className="card">
                                <div className="card-body">
                                    <form className="form-group row" ref={this.bookSearchForm} onSubmit={this.onBookSearchFormSubmit}>
                                        <div className="col-10">
                                            <input type="text" className="form-control" id="bookQuery" name="q" placeholder="Search for torrents" />
                                        </div>
                                        <div className="col-2">
                                            <button type="submit" className="btn btn-primary icon">
                                                <i className="material-icons">search</i>
                                                <span>Search</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        );
    }

    dashboard() {
        var $this = this;
        userStore.subscribe(function() {
            var books = userStore.getState()['books'],
                bookList = [],
                url = '';

            for (var i = 0;i < books.length;i++) {
                url = '/book/' + books[i].slug;
                bookList.push(
                    <div className="card">
                        <img className="card-img-top" src={books[i].photo} alt="" />
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={url}>{books[i].title}</Link>
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">{books[i].author}</h6>
                        </div>
                    </div>
                );
            }

            $this.setState({
                bookList: bookList
            });
        });

        return (
            <div className="container" id="content">
                <div className="row">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header">
                                Tessa
                            </div>
                            <div className="card-body">
                                <form className="form-group row" ref={this.bookSearchForm} onSubmit={this.onBookSearchFormSubmit}>
                                    <div className="col-10">
                                        <input type="text" className="form-control" id="bookQuery" name="q" placeholder="Search for torrents" />
                                    </div>
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary icon">
                                            <i className="material-icons">search</i>
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <p></p>
                        <div className="card">
                            <div className="card-header">
                                <span>My Torrents</span>&nbsp;
                                <Link to="/addtorrent" className="btn btn-primary btn-sm icon">
                                    <i className="material-icons">library_add</i>
                                    <span>Add Torrent</span>
                                </Link>
                            </div>
                            <div className="card-body">
                                <div className="card-columns">
                                {this.state.bookList}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
            </div>
        );
    }

    render() {
        var content;

        if (isLoggedIn()) {
            content = this.dashboard();
        } else {
            content = this.intro();
        }

        return (
            <div>
                <Header/>
                {content}
            </div>
        );
    }
}

export default Home;
