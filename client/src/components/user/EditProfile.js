import React from 'react';
import HomePage from '../homepage/HomePage.js';
import '../../css/userlogin.css';import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import MainNav from '../../mainNav.js';
import { userActions } from '../../apiActions'; 
import { connect } from 'react-redux';

class EditProfile extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e){
    console.log(e.target.id, e.target.value);
    if(e.target.name == "file"){
        var data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('name', 'file');
        data.append('description', 'some value user types');
        console.log("update");
        this.setState({ [e.target.name]: data });
    } else {
        this.setState( { [e.target.id] : e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const { dispatch } = this.props;
    dispatch(userActions.updateProfile(this.state));
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
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input type="text" className="form-control" id="firstname" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" className="form-control" id="lastname" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" className="form-control" id="state" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zip Code</label>
                <input type="text" className="form-control" id="zip" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number</label>
                <input type="text" className="form-control" id="phone" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="creditcard">Credit Card Number</label>
                <input type="text" className="form-control" id="creditcard" onChange={this.onChange}/>
              </div>
              <FormGroup>
                  <Label for="file">Upload Image</Label>
                  <Input type="file" name="file" id="file" onChange={this.onChange}/>
                  <FormText color="muted">
                  Only .jpg images
                    </FormText>
                </FormGroup>
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

function mapStateToProps(state){
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    }
}

export default connect(mapStateToProps)(EditProfile);