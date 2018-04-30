import React from 'react';
import MainNav from '../../mainNav.js';

export default class PaymentHistory extends React.Component {
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
                <div>
                    <h1>Past Payment</h1>
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