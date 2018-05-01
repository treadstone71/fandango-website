import React from 'react';
//import NavBar from '../NavBar/NavBar';

class MainNav extends React.Component{
    constructor(){
        super();

    }
    render() {
        return (
            <div class="Navbar">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="/"><img src="https://lh3.googleusercontent.com/gAuQ6y9UBh5E3AlJL8m383NAcoI4Gl9lM3JosyAwNfqEaj1CdoqTC8bSkymghrbY3iEa9g=s170" /></a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <a className="nav-link" href="/userlogin">User</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="/adminlogin">Admin</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="/madminlogin">Movie Admin</a>
        </li>
        </ul>
        </div>
        </div>
        </nav>

        </div>
    );
    }
}

export default MainNav;