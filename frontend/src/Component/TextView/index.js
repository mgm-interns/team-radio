import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

class TextView extends Component {
  render() {
    const { input, label, type, placeholder, classes, border } = this.props;
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
        InputProps={
          border && {
            disableUnderline: true,
            classes: {
              root: classes.textFieldRoot,
              input: classes.textFieldInput,
            },
          }
        }
        InputLabelProps={
          border && {
            shrink: true,
            className: classes.textFieldFormLabel,
          }
        }
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
};

export default withStyles(styles)(TextView);
