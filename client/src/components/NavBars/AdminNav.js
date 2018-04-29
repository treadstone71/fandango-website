import React from 'react';
import { apiActions } from '../../apiActions/api.actions.js';

class AdminNav extends React.Component{
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
        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="/"><img src="https://lh3.googleusercontent.com/gAuQ6y9UBh5E3AlJL8m383NAcoI4Gl9lM3JosyAwNfqEaj1CdoqTC8bSkymghrbY3iEa9g=s170" /></a>
            &nbsp;
            <a class="navbar-brand" href="/admin/dashboard">Dashboard</a>
            &nbsp;
            <ul class="nav navbar-nav actions ml-auto">
            <li class="dropdown">
            <a class="btn btn-primary dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown">
            Admin
           </a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/admin/add-movie-hall">Add Movie Hall</a></li>
            <li><a class="dropdown-item" href="/admin/search-movie-hall">Search Movie/Hall</a></li>
            <li><a class="dropdown-item" href="/admin/search-users-bills">Search Users/Bills</a></li>
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
export default AdminNav;