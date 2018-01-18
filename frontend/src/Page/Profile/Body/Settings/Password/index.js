import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { settingsValidate, minLength6, required } from 'Util/validate';
import { TextView } from 'Component';
import { withStyles } from 'material-ui/styles/index';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Grid from 'material-ui/Grid';
import { FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setPassword } from 'Redux/api/userProfile/actions';

import { trimText } from 'Transformer/transformText';

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
    const { userProfile: { error } } = nextProps;
    if (error !== null) {
      this.setState({
        formErrors: error.response.message,
      });
    } else {
      this.setState({
        formErrors: '',
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
          name="currentPassword"
          placeholder="Current password"
          type="password"
          component={TextView}
          label="Current password"
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
    // if (!this.state.formErrors) {
    //   this.props.onDone();
    // }
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;
    console.log('password render');
    return (
      <Grid className={classes.content}>
        {/* <form onSubmit={handleSubmit(this._submitModal)}> */}
        <form onSubmit={handleSubmit}>
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
  initialValues: PropTypes.any,
  submitSucceeded: PropTypes.any,
};

const mapStateToProps = ({ api }) => ({
  initialValues: api.userProfile.data,
  userProfile: api.userProfile,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ userId, currentPassword, newPassword }) =>
    dispatch(
      setPassword({
        userId,
        currentPassword: trimText(currentPassword),
        newPassword: trimText(newPassword),
      }),
    ),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  reduxForm({
    form: 'editProfilePasswordForm',
    validate: settingsValidate,
  }),
)(Password);