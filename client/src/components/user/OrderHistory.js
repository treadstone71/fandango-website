import React, { Component } from 'react';
import Order from './Order.js';
class OrderHistory extends Component {
  render() {
    const left = {
      float: 'left'
    };
    const right = {
      float: 'right'
    };
    const section = {
      borderBottom: '1px solid black',
      marginBottom: '30px'
    };
    const clear = {
      clear: 'both'
    };
    return (
      <div>
        <section style={section}>
          <h2>orders</h2>
          <h3>$65.55</h3>
          <div>
            <p style={left}>Wed, Apr 25 - #1019670897606</p>
            <p style={right}>VIEW ORDER</p>
            <div style={clear} />
          </div>
        </section>
        <section>
          <Order />
          <Order />
        </section>
      </div>
    );
  }
}
export default OrderHistory;
