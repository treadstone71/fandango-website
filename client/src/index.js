import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { history } from './_helpers/history.js';
import Login from './components/Logins/login.js';
import UserLogin from './components/Logins/UserLogin.js';
import HomePage from './components/homepage/HomePage';

import EditProfile from './components/user/EditProfile.js';

import { Router, Route, Link, Redirect } from 'react-router-dom';

ReactDOM.render(
    <Router history={history}>
    <div>
    <Route path="/adminlogin" component={Login}/>
    <Route path="/userlogin" component={UserLogin}/>
    <Route path="/editprofile" component={EditProfile}/>
    <Route exact path="/" component={HomePage} />

    </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
