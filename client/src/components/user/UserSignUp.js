import React from 'react';
import MainNav from '../../mainNav.js';
import '../../css/userlogin.css';

export default class UserSignup extends React.Component {
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
                <MainNav />
                <div className="userlogin">
                    <h1>User Signup</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" autoFocus/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" />
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