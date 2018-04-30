import React, {Component} from 'react';

class Order extends Component {
  render() {
    const order = {
      height: '200px',
      width: '350px',
      padding: '20px',
      border: '1px solid black',
      borderRadius: '10px',
      display: 'inline-block',
      margin: '10px'
    };
    const image = {
      height: '150px',
      width: '150px',
      float: 'left',
      marginRight: '20px'
    };
    const h4 = {
      margin: 0
    };
    return (
      <div style={order}>
        <h4 style={h4}>delivered mon, apr 30</h4>
        <img style={image} src={'https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Bugs_Bunny.svg/200px-Bugs_Bunny.svg.png'} />
        <p>name: Bugs Bunny</p>
        <p>showed on: 05/23/2014</p>
        <p>number of tickets: 2</p>
        <p>total price: $30</p>
      </div>
    );
  }
}
export default Order;