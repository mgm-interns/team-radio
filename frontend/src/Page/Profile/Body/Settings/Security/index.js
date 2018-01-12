import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm, Form } from 'redux-form';
import {
  settingsValidate,
  maxLength15,
  minLength6,
  required,
} from 'Util/validate';
import { TextView } from 'Component';
import { withStyles } from 'material-ui/styles/index';
import { connect } from 'react-redux';
import { updatePassword } from 'Redux/api/user/actions';

import Grid from 'material-ui/Grid';
import { FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { saveAuthenticationState } from 'Config';

import styles from '../styles';

class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asyncError: '',
    };

    this._renderChangePasswordForm = this._renderChangePasswordForm.bind(this);
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
  }

  _onCancelButtonClick() {
    this.props.onCancel();
  }

  _renderChangePasswordForm() {
    const {
      classes,
      submitSucceeded,
      userResponse: { is_password },
    } = this.props;
    return [
      is_password === false && (
        <Field
          key={1}
          name="oldPassword"
          placeholder="Old password"
          type="password"
          component={TextView}
          label="Old password"
          validate={[required, minLength6]}
          border
        />
      ),
      <Field
        key={2}
        name="newPassword"
        placeholder="New password"
        type="password"
        component={TextView}
        label="New password"
        validate={[required, minLength6]}
        border
      />,
      <Field
        key={3}
        name="confirmPassword"
        placeholder="Re-enter your password"
        type="password"
        component={TextView}
        label="Confirm password"
        validate={[required]}
        border
      />,
      <FormHelperText key={4} className={classes.error}>
        {submitSucceeded && this.state.asyncError}
      </FormHelperText>,
    ];
  }

  render() {
    const { classes, handleSubmit, pristine, submitting, reset } = this.props;

    return (
      <Grid container className={classes.content}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} className={classes.formInformation}>
            {this._renderChangePasswordForm()}
          </Grid>
          <Grid item xs={12} className={classes.modalFooter}>
            <Button onClick={this._onCancelButtonClick}>Cancel</Button>
            <Button
              raised
              disabled={pristine || submitting}
              color="primary"
              type="submit"
            >
              Save changes
            </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

Security.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
  submitSucceeded: PropTypes.any,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
  userResponse: state.api.user.data,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ oldPassword, newPassword }) =>
    dispatch(updatePassword(oldPassword, newPassword)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'editProfileSecurityForm',
    validate: settingsValidate,
  }),
)(Security);
