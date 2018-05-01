import React from 'react';
import MainNav from '../../mainNav.js';
import '../../css/userlogin.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const api = 'http://localhost:3000';

export default class UserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
        username: '',
        password: '',
        err_message: null,
        isLogin: false
    };
  }
  handleUNChange(e){
      this.setState({username: e.target.value, err_message:null});
  }

  handlePWChange(e){
      this.setState({password: e.target.value, err_message:null});
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username == '') {
        this.setState({err_message: "Please fill in username."});
        return;
    }
    if (this.state.password == '') {
        this.setState({err_message: "Please fill in password."});
        return;
    }
    axios.post(api+'/login', this.state).then(res => {
        console.log(res);
        console.log(res.data);
        if (res.status == 'SUCCESS' || res.state == 201) {
            this.setState({isLogin: true});
        }
    });
    // this.setState({isLogin: true});
  }
  render() {
    const isErr = this.state.err_message==null? null : (
        <div className="alert alert-success">
            {this.state.err_message}
        </div>
        );
    const login = this.state.isLogin? (
        <Redirect to='/'/>
        ) : null;
    return (
      <div className="container">
        <MainNav />
        <div className="userlogin">
          <h1>User Login</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={this.state.username} onChange={this.handleUNChange.bind(this)} 
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handlePWChange.bind(this)} />
            </div>
            {isErr}
            {login}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <br />
            <br />
            <p>
              Create an Account <a href="/signup">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
