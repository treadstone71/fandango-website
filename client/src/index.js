import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { history } from './_helpers/history.js';

import UserLogin from './components/Logins/UserLogin.js';
import HomePage from './components/homepage/HomePage';
import AdminLogin from './components/Logins/AdminLogin';
import MovieHallAdminLogin from './components/Logins/MovieHallAdminLogin';
import AdminDashboard from './components/AdminHome/AdminDashboard';
import AddMovieHall from './components/AdminHome/AddMovieHall';
import SearchUsersBills from './components/AdminHome/SearchUsersBills';
import ViewBill from './components/AdminHome/ViewBill';
import UserComponent from './components/AdminHome/UserComponent';

import SearchMovieHall from './components/AdminHome/SearchMovieHall';
import MovieDetails from './components/AdminHome/MovieDetails';
import MovieHallDetails from './components/AdminHome/MovieHallDetails';
import MovieAdminDashboard from './components/MovieAdminHome/MovieAdminDashboard';
import AddMovie from './components/MovieAdminHome/AddMovie';
import MakePayment from './components/user/MakePayment';
import OrderHistory from './components/user/OrderHistory';
import EditProfile from './components/user/EditProfile.js';
import BookTicket from './components/user/BookTicket.js';
import UserSignup from './components/user/UserSignUp.js';
import MoviePage from './components/homepage/MoviePage';
import MovieHall from './components/homepage/MovieHall';
import MovieHallSearch from './components/user/MovieHallSearch';
import { Provider } from 'react-redux';
import { store } from './_helpers/store.js';
import { Router, Route, Link, Redirect } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/userlogin" component={UserLogin} />
        <Route exact path="/signup" component={UserSignup} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/makepayment" component={MakePayment} />
        <Route exact path="/orderhistory" component={OrderHistory} />
        <Route exact path="/madmin/add-movie" component={AddMovie} />
        <Route exact path="/adminlogin" component={AdminLogin} />
        <Route exact path="/madminlogin" component={MovieHallAdminLogin} />
        <Route exact eaxct path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/madmin/dashboard" component={MovieAdminDashboard} />
        <Route
          exact
          path="/admin/search-movie-hall"
          component={SearchMovieHall}
        />
        <Route exact path="/admin/movie/:movie_id" component={MovieDetails} />
        <Route exact path="/admin/add-movie-hall" component={AddMovieHall} />
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/admin/moviehall/:hall_id"
          component={MovieHallDetails}
        />
        <Route
          exact
          path="/admin/search-users-bills"
          component={SearchUsersBills}
        />
        <Route exact path="/admin/bill/:billingid" component={ViewBill} />
        <Route exact path="/admin/user/:userid" component={UserComponent} />

        <Route exact path="/" component={HomePage} />
        <Route exact path="/movie/:id" component={MoviePage} />
        <Route exact path="/hall/:id" component={MovieHall} />
        <Route
          exact
          path="/bookticket/:hallId/:movieId/:time"
          component={BookTicket}
        />

        <Route exact path="/search" component={MovieHallSearch} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
