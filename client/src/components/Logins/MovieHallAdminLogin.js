import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import MainNav from '../../mainNav.js';
import '../../css/madminlogin.css';
import { apiActions } from '../../apiActions';
import { connect } from 'react-redux';

class MovieHallAdminLogin extends React.Component{
    constructor(){
        super();
        this.state = {
            'username': '',
            'password': ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(apiActions.isLoggedIn());
    }
    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e){
        e.preventDefault();
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if(username && password) {
                dispatch(apiActions.login(username, password));
        }
    }
    render(){
            if(this.props.loggedIn == false){
                return(
                    <div className="container">
                    <MainNav />
                    <div className="madminlogin">
                    <h1>Movie Hall Admin Login</h1>
                <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={this.handleChange} autoFocus/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    </div>
                    </div>
                );
            } else if(this.props.loggedIn == true){
                return <Redirect  to = '/madminhome'></Redirect>
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
export default connect(mapStateToProps)(MovieHallAdminLogin);