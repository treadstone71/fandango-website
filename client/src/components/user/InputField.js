import React, {Component} from 'react';

class InputField extends Component {
  render() {
    const style = {
      width: this.props.width,
      margin: '0 5px'
    };
    return (
      <span>
        <input style={style} />
      </span>
    );
  }
}
export default InputField;
