import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { settingsValidate } from 'Util/validate';
import { TextView } from 'Component';
import { withStyles } from 'material-ui/styles/index';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Grid from 'material-ui/Grid';
import { FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router';
import { setPassword } from 'Redux/api/user/profile';

import { trimText } from 'Transformer/transformText';
import tokenInjector from 'Util/redux/tokenInjector';
import fields from './fields';
import styles from '../styles';

// TODO: close modal after success

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: null,
    };

    this._renderChangePasswordForm = this._renderChangePasswordForm.bind(this);
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
    this._submitModal = this._submitModal.bind(this);
    this._renderForm = this._renderForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user: { error } } = nextProps;
    if (error !== null) {
      this.setState({
        formErrors: error.response.message,
      });
    } else {
      this.setState({
        formErrors: null,
      });
    }
  }

  _onCancelButtonClick() {
    this.props.onCancel();
  }

  _renderForm(form, key) {
    if (
      form.field.name === 'currentPassword' &&
      !this.props.user.data.is_password
    ) {
      return undefined;
    }
    return [
      <Field
        key={key}
        component={TextView}
        {...form.field}
        {...form.field.props}
      />,
    ];
  }

  _renderChangePasswordForm() {
    const { classes, submitSucceeded } = this.props;

    return [
      <Fragment key={1}>
        {Object.keys(fields).map(key => this._renderForm(fields[key], key))}
      </Fragment>,
      <FormHelperText key={2} className={classes.error}>
        {submitSucceeded && this.state.formErrors}
      </FormHelperText>,
    ];
  }

  async _submitModal(values) {
    await this.props.onSubmit({
      userId: this.props.initialValues.userId,
      ...values,
    });
    if (!this.state.formErrors) {
      await this.props.onDone();
    }
  }

  static _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      user: { loading },
    } = this.props;

    return (
      <Grid className={classes.content}>
        <form onSubmit={handleSubmit(this._submitModal)}>
          <Grid item xs={12}>
            {this._renderChangePasswordForm()}
          </Grid>
          <Grid item xs={12} className={classes.modalFooter}>
            {loading
              ? Password._renderLoading()
              : [
                  <Button
                    key={1}
                    onClick={this._onCancelButtonClick}
                    className={classes.button}
                    color="primary"
                    autoFocus
                  >
                    Cancel
                  </Button>,
                  <Button
                    key={2}
                    disabled={pristine || submitting}
                    color="primary"
                    type="submit"
                    className={classes.button}
                  >
                    Save
                  </Button>,
                ]}
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
  initialValues: api.user.data,
  user: api.user,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ userId, currentPassword, newPassword }) =>
    dispatch(
      tokenInjector(
        setPassword({
          userId,
          currentPassword: trimText(currentPassword),
          newPassword: trimText(newPassword),
        }),
      ),
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
