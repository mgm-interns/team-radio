import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

class TextView extends Component {
  render() {
    const {
      input,
      label,
      type,
      placeholder,
      autoCapitalize,
      classes,
      value,
      ...others
    } = this.props;
    const { touched, error } = this.props.meta;
    return (
      <TextField
        fullWidth
        label={label}
        type={type}
        placeholder={placeholder}
        inputProps={{autoCapitalize: autoCapitalize}}
        error={!!(touched && error)}
        helperText={touched && error}
        {...input}
        style={{ marginBottom: '20px' }}
        {...others}
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
  border: PropTypes.bool,
  autoCapitalize: PropTypes.string,
};

export default withStyles(styles)(TextView);
