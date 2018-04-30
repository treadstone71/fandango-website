import React, { Component } from 'react';
import InputField from './InputField.js';
import InputFieldLabel from './InputFieldLabel.js';
import MainNav from '../../mainNav.js';

const inputRow = {
  margin: '30px 0',
  display: 'flex'
};

const wrapper = {
  textAlign: 'center'
};

class MakePayment extends Component {
  render() {
    return (
      <div className="container">
        <MainNav />
        <div style={wrapper}>
          <h3>Make a Payment</h3>
          <div style={inputRow}>
            <InputFieldLabel content={'Credit Card #'} />
            <InputField width={'200px'} />
          </div>
          <div style={inputRow}>
            <InputFieldLabel content={'Expiration Date'} />
            <InputField />/<InputField />
          </div>
          <div style={inputRow}>
            <InputFieldLabel content={'Security ID'} />
            <InputField width={'50px'} />
          </div>
          <div style={inputRow}>
            <InputFieldLabel content={'Name as it appears on the card'} />
            <InputField />
          </div>
          <button type="submit" className="btn btn-primary">
            Pay
          </button>
        </div>
      </div>
    );
  }
}
export default MakePayment;
