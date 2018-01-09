import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class TextView extends Component {
  render() {
    const { input, label, type, placeholder } = this.props;
    const { touched, error } = this.props.meta;
    return (
      <TextField
        fullWidth
        label={label}
        type={type}
        placeholder={placeholder}
        error={!!(touched && error)}
        helperText={touched && error}
        {...input}
        style={{ marginBottom: '20px' }}
      />
    );
  }
}

TextView.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  touched: PropTypes.any,
  error: PropTypes.any,
  meta: PropTypes.any,
};

export default TextView;
