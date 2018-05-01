import React from 'react';
import HomePage from '../homepage/HomePage.js';
import '../../css/userlogin.css';
import MainNav from '../../mainNav.js';

export default class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        password: ''
      }
    };
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    const section = {
      marginTop: '100px',
      marginBottom: '30px'
    };
    return (
      <div className="container">
        <MainNav />
        <div className="editprofile">
          <section style={section}>
            <h1>Edit Your Profile</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input type="text" className="form-control" id="firstname" />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" className="form-control" id="lastname" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" className="form-control" id="state" />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zip Code</label>
                <input type="text" className="form-control" id="zipcode" />
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number</label>
                <input type="text" className="form-control" id="phonenumber" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="creditcard">Credit Card</label>
                <input type="text" className="form-control" id="creditcard" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}
