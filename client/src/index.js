import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { history } from './_helpers/history.js';

import UserLogin from './components/Logins/UserLogin.js';
import HomePage from './components/homepage/HomePage';
import AdminLogin from './components/Logins/AdminLogin';
import AdminDashboard from './components/AdminHome/AdminDashboard';
import AddMovieHall from './components/AdminHome/AddMovieHall';

import SearchMovieHall from './components/AdminHome/SearchMovieHall';
import MovieDetails from './components/AdminHome/MovieDetails';
import MovieHallDetails from './components/AdminHome/MovieHallDetails';

import EditProfile from './components/user/EditProfile.js';
import { Provider } from 'react-redux';
import { store } from './_helpers/store.js';
import { Router, Route, Link, Redirect } from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
    <div>
    <Route path="/userlogin" component={UserLogin}/>
    <Route path="/editprofile" component={EditProfile}/>

    <Route path="/adminlogin" component={AdminLogin}/>
    <Route exact path="/admin/dashboard" component={AdminDashboard}/>
    <Route path = "/admin/search-movie-hall" component={SearchMovieHall} />
    <Route path = "/admin/movie/:movie_id" component={MovieDetails} />
    <Route exact path="/admin/add-movie-hall" component={AddMovieHall}/>
    <Route exact path="/" component={HomePage} />
    <Route path = '/admin/moviehall/:hall_id' component={MovieHallDetails} />

    </div>
    </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
