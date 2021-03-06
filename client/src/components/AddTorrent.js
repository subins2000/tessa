import axios from 'axios';
import React, { Component } from 'react';
import toastr from 'toastr';

import { isLoggedIn } from '../store.js';
import Header from './partial/Header.js';


class AddTorrent extends Component {
    constructor(props){
        super(props);

        if (!isLoggedIn()) {
            this.props.history.push('/login');
        }

        this.initialState = {
            inputTitle: '',
            inputAuthor: '',
            inputKeywords: '',
            inputPhotoLabel: 'Choose Photo',
        };
        this.state = this.initialState;

        this.inputPhoto = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();

        var $this = this;

        for (var key in this.state) {
            if (this.state[key] === '') {
                toastr.info('All fields should be filled');
                return;
            }
        }

        var data = new FormData();

        data.append('title', this.state.inputTitle);
        data.append('author', this.state.inputAuthor);
        data.append('semester', this.state.inputSemester);
        data.append('branch', this.state.inputBranch);
        data.append('branch', this.state.inputKeywords);
        data.append('description', this.state.inputDescription);

        if (this.inputPhoto.current.files.length === 1) {
            data.append('photo', this.inputPhoto.current.files[0]);
        }

        /**const contract = web3.eth.contract('https://testnet2.matic.network');
        const contractInstance = contract.at('0x226cdfa392921aa611fc952e450a3c2b4463ad5bc8a0984d0287a136e67f591e');

        const transactionObject = {
            from: fromAccount,
            gas: '1000',
            gasPrice: '0.1'
        };

        contractInstance.createRandomAgency.sendTransaction('name', transactionObject, (error, result) => { // do something with error checking/result here });*/

        axios.post('/api/torrents/add', data).then(function(response) {

            if (response.status === 201) {
                toastr.info('Torrent added !');

                // Reset form
                $this.setState($this.initialState);
                $this.inputPhoto.current.value = '';
            }

        }).catch(function(error) {
            console.log(error);

            if (error.response.status === 401) {

            }
        });
    }

    render() {
        var name = sessionStorage.getItem('selectedAddress');

        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <h1>Add Torrent</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputName">Title</label>
                            <input type="text" className="form-control" id="inputTitle" placeholder="Title of the torrent" value={this.state.inputTitle} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAuthor">Author</label>
                            <input type="text" className="form-control" id="inputAuthor" disabled placeholder="Name of author" value={name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputKeywords">Keywords</label>
                            <textarea type="text" className="form-control" id="inputKeywords" placeholder="Keywords separated by spaces" value={this.state.inputKeywords} onChange={this.handleInputChange} />
                        </div>
                        <button className="btn btn-primary">Add Torrent</button>
                    </form>
                </div>
            </div>
        );

        /**
        <div className="form-group">
            <label htmlFor="inputDescription">Description</label>
            <textarea type="text" className="form-control" id="inputDescription" placeholder="Description of the torrent. what it is about, condition of the torrent etc." value={this.state.inputDescription} onChange={this.handleInputChange} />
        </div>
        */
    }
}

export default AddTorrent;
