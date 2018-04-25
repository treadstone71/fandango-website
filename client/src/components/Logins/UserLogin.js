import React from 'react';
import HomePage from '../homepage/HomePage.js';

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
                <div style={{maxWidth: '425px', width: '100%', margin: 'auto'}}>
                    <h1>User Login</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" />
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}