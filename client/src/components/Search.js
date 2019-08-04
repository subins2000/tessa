import axios from 'axios';
import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import * as constants from '../constants';
import Header from './partial/Header.js';


class Search extends Component {

    constructor(props) {
        super(props);

        const qs = require('query-string');
        this.queryParams = qs.parse(window.location.search);

        this.state = {
            q: this.queryParams['q'],
            results: []
        };

        this.torrentsearchForm = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.ontorrentsearchFormSubmit = this.ontorrentsearchFormSubmit.bind(this);
        this.search = this.search.bind(this);
        this.updateURLAndSearch = this.updateURLAndSearch.bind(this);

        this.search();
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});

        if (e.target.id === 'branch' || e.target.id === 'semester') {
            setTimeout(this.updateURLAndSearch, 1000);
        }
    }

    updateURLAndSearch() {
        var queryString = new URLSearchParams(new FormData(this.torrentsearchForm['current'])).toString();
        this.props.history.push('/search?' + queryString);
        this.search();
    }

    ontorrentsearchFormSubmit(e) {
        e.preventDefault();
        this.updateURLAndSearch();
    }

    search() {
        var $this = this;

        axios.get(constants.NODE + '/search', {
            params: {
                q: this.state.q
            }
        }).then(function(response) {
            var torrents = response.data,
                bookList = [],
                url = '';

            for (var i = 0;i < torrents.length;i++) {
                url = '/torrent/' + torrents[i].slug;
                bookList.push(
                    <div className="card" key={i}>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={url}>{torrents[i].title}</Link>
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">{torrents[i].author}</h6>
                        </div>
                    </div>
                );
            }

            $this.setState({
                results: bookList,
            })
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <div className="card">
                        <div className="card-header">
                            Search
                        </div>
                        <div className="card-body">
                            <form className="form-group" ref={this.torrentsearchForm} onSubmit={this.ontorrentsearchFormSubmit}>
                                <div className="row">
                                    <div className="col-10">
                                        <input type="text" className="form-control" id="bookQuery" name="q" placeholder="Search for torrents" value={this.state.bookQuery} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary icon">
                                            <i className="material-icons">search</i>
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className="card">
                        <div className="card-header">
                            <span>{this.state.results.length} results</span>
                        </div>
                        <div className="card-body">
                            <div className={this.state.results.length > 0 ? 'd-none' : ''}>
                                <p>No results found</p>
                            </div>
                            <div className="card-columns">
                                {this.state.results}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
