import React from 'react';
import HomePage from '../homepage/HomePage.js';
import '../../css/userlogin.css';

export default class UserLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                username: '',
                password: ''
            }
        };
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        return(
            <div className="container">
                <HomePage />
                <div className="userlogin">
                    <h1>User Login</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}