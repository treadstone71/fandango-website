import React from 'react';
import MainNav from '../../mainNav.js';
import '../../css/userlogin.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { apiActions } from '../../apiActions';
import { connect } from 'react-redux';

const api = 'http://localhost:3000';

class UserSignup extends React.Component {
    constructor() {
        super();
        this.state = {
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState( { [e.target.id] : e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.email == '' || this.state.email == undefined) {
            this.setState({err_message: "Please fill in email."});
            return;
        }
        if (this.state.username == '' || !this.state.username) {
            this.setState({err_message: "Please fill in username."});
            return;
        }
        if (this.state.password == '' || !this.state.password) {
            this.setState({err_message: "Please fill in password."});
            return;
        }
        
        const { dispatch } = this.props;
        dispatch(apiActions.signup(this.state));
    }

    render() {
        const isErr = this.state.err_message==null? null : (
            <div className="alert alert-success">
                {this.state.err_message}
            </div>
            );

        return(
            <div className="container">
                <MainNav />
                <div className="userlogin">
                    <h1>User Signup</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email" onChange={this.onChange} autoFocus/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" onChange={this.onChange} />
                        </div>
                        {isErr}
                        <button type="submit" className="btn btn-primary">Join</button>
            <br/>
            <br/>

                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    }
}
export default connect(mapStateToProps)(UserSignup);