import React, {Component} from 'react';

class InputFieldLabel extends Component {
  render() {
    const asterisk = {
      color: 'red',
      marginRight: '5px'
    };
    const label = {
      display: 'inline-block',
      width: '50%',
      textAlign: 'right'
    };
    return (
      <div style={label}>
        <span style={asterisk}>*</span>{this.props.content}:
      </div>
    );
  }
}
export default InputFieldLabel;
