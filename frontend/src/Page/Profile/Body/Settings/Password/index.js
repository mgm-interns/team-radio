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
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Grid from 'material-ui/Grid';
import { FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';
import { setPassword } from 'Redux/api/user/profile';

import { saveAuthenticationState } from 'Configuration';

import styles from '../styles';

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: '',
    };

    this._renderChangePasswordForm = this._renderChangePasswordForm.bind(this);
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
    this._submitModal = this._submitModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { password: { message } } = nextProps;
    if (message !== null) {
      this.setState({
        formErrors: message,
      });
    }
  }

  _onCancelButtonClick() {
    this.props.onCancel();
  }

  _renderChangePasswordForm() {
    const { classes, submitSucceeded, user: { is_password } } = this.props;

    return [
      is_password !== false && (
        <Field
          key={1}
          name="oldPassword"
          placeholder="Old password"
          type="password"
          component={TextView}
          label="Old password"
          validate={[required, minLength6]}
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
      />,
      <Field
        key={3}
        name="confirmPassword"
        placeholder="Re-enter your password"
        type="password"
        component={TextView}
        label="Confirm password"
        validate={[required]}
      />,
      <FormHelperText key={4} className={classes.error}>
        {submitSucceeded && this.state.formErrors}
      </FormHelperText>,
    ];
  }

  _submitModal(values) {
    this.props.onSubmit({ userId: this.props.initialValues.userId, ...values });
    if (this.state.formErrors) {
      this.props.onDone();
    }
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const { classes, handleSubmit, pristine, submitting, loading } = this.props;

    if (loading) {
      return this._renderLoading();
    }

    return (
      <Grid className={classes.content}>
        <form onSubmit={handleSubmit(this._submitModal)}>
          <Grid item xs={12}>
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

Password.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onDone: PropTypes.func,
  password: PropTypes.any,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const mapStateToProps = ({ api }) => ({
  initialValues: api.user.data,
  password: api.userProfile.password.data,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ userId, oldPassword, newPassword }) =>
    dispatch(
      setPassword({
        userId,
        oldPassword,
        newPassword,
      }),
    ),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'editProfilePasswordForm',
    validate: settingsValidate,
  }),
)(Password);
