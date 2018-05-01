import React from 'react';
import MainNav from '../../mainNav.js';
import '../../css/userlogin.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { apiActions } from '../../apiActions'; 
import { connect } from 'react-redux';

const api = 'http://localhost:3000';

class UserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
        username: '',
        password: '',
        err_message: null,
        isLogin: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUNChange = this.handleUNChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
  }
  handleUNChange(e){
      this.setState({username: e.target.value, err_message:null});
  }

  handlePWChange(e){
      this.setState({password: e.target.value, err_message:null});
  }
  componentDidMount(){
        const { dispatch } = this.props;
        dispatch(apiActions.isLoggedIn());
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
    const { dispatch } = this.props;
    dispatch(apiActions.login(this.state.username, this.state.password, "user"));
    // this.setState({isLogin: true});
  }
  render() {
    const isErr = this.state.err_message==null? null : (
        <div className="alert alert-success">
            {this.state.err_message}
        </div>
        );

        if(this.props.loggedIn == false){
    return (
      <div className="container">
        <MainNav />
        <div className="userlogin">
          <h1>User Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={this.state.username} onChange={this.handleUNChange} 
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handlePWChange.bind(this)} />
            </div>
            {isErr}
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
  } else if(this.props.loggedIn == true){
                return <Redirect  to = '/admin/dashboard'></Redirect>
            } else {
                return (null);
            }
    
  }
}

function mapStateToProps(state){
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    }
}
export default connect(mapStateToProps)(UserLogin);
