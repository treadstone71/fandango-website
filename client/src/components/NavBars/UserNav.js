import React from 'react';

import { apiActions } from '../../apiActions/api.actions.js';
import { connect } from 'react-redux';

class UserNav extends React.Component{
	constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const { name } = e.target;
        const { dispatch } = this.props;

        if(name == "logout"){
            dispatch(apiActions.logout());
        }

    }

    render(){
    	const { authentication } = this.props;
        return(
        	<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="/"><img src="http://localhost:3000/fandango.jpg" /></a>
            &nbsp;
            &nbsp;
            <ul class="nav navbar-nav actions ml-auto">
            <li class="dropdown">
            <a class="btn btn-primary dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown">
            Click Here
           </a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/search">Search Movies/Halls</a></li>
            <li><a class="dropdown-item" href={"/profile/"+authentication.username}>My Profile</a></li>
            <li><a class="dropdown-item" href="/purchases">Purchases</a></li>
            <li><a class="dropdown-item" href="/editprofile">Update Profile</a></li>
        </ul>
        </li>
            </ul>
         &nbsp;
        <button class="btn btn-warning navbar-btn navbar-right" name="logout" onClick={this.handleClick}>Log out</button>
        </div>
        </nav>
        );
    }
}

function mapStateToProps(state){
    const { user, authentication } = state;
    return {
        user, authentication
    }
}
export default connect(mapStateToProps)(UserNav);
