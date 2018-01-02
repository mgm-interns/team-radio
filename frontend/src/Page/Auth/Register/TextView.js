import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class TextView extends Component {
  render() {
    const { input, label, type, placeholder } = this.props;
    const { touched, error, warning } = this.props.meta;
    return (
      <TextField
        fullWidth
        label={label}
        type={type}
        placeholder={placeholder}
        label={label}
        error={!!(touched && error)}
        helperText={touched && error}
        {...input}
        style={{ marginBottom: '20px' }}
      />
    );
  }
}

export default TextView;
