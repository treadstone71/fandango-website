import React from 'react';
import HomePage from '../homepage/HomePage.js';
import '../../css/userlogin.css';
import MainNav from '../../mainNav.js';

export default class ViewProfile extends React.Component {
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
        <div className="viewprofile">
          <section style={section}>
            <h1>View Your Profile</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <li className="list-group-item">firstname</li>
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <li className="list-group-item">lastname</li>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <li className="list-group-item">address</li>
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <li className="list-group-item">city</li>
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <li className="list-group-item">state</li>
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zip Code</label>
                <li className="list-group-item">zip</li>
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number</label>
                <li className="list-group-item">phone</li>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <li className="list-group-item">email</li>
              </div>
              <div className="form-group">
                <label htmlFor="creditcard">Credit Card Number</label>
                <li className="list-group-item">creditcardnumber</li>
              </div>

              <button type="submit" className="btn btn-primary">
                Return home
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}
