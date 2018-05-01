import React from 'react';
import MainNav from '../../mainNav.js';
import '../../css/userlogin.css';
import axios from 'axios';
const api = 'http://localhost:3000';

export default class UserSignup extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            err_message: null
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.username === '') {
            this.setState({err_message: "Please fill in username."});
            return;
        }
        if (this.password === '') {
            this.setState({err_message: "Please fill in password."});
            return;
        }
        axios.post(api+'/users/register', this.state).then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    handleUNChange(e){
        this.setState({username: e.target.value});
    }

    handlePWChange(e){
        this.setState({password: e.target.value});
    }

    render() {
        return(
            <div className="container">
                <MainNav />
                <div className="userlogin">
                    <h1>User Signup</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handleUNChange.bind(this)} autoFocus/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handlePWChange.bind(this)} />
                        </div>
                        <div className="alert alert-success">
                          {this.state.err_message}
                        </div>
                        <button type="submit" className="btn btn-primary">Join</button>
            <br/>
            <br/>

                    </form>
                </div>
            </div>
        );
    }
}