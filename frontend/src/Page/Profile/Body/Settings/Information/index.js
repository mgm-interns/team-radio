import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles/index';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setUsername, setUserInformation } from 'Redux/api/user/profile';

import { TextView } from 'Component';
import { trimText } from 'Transformer/transformText';
import tokenInjector from 'Util/redux/tokenInjector';

import fields from './fields';
import styles from '../styles';

// TODO: fix bugs username is available but still notification success
// TODO: add scrollbar to this form
// TODO: close modal after success

class Information extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: null,
    };

    this._renderChangeInformationForm = this._renderChangeInformationForm.bind(
      this,
    );
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      user: { error, data },
    } = nextProps;
    const currentUser = this.props.user.data;

    if (error !== null) {
      this.setState({
        formErrors: error.response.message,
      });
    } else {
      this.setState({
        formErrors: null,
      });
    }

    // redirect again when user change their username
    if (data.username !== currentUser.username) {
      this.props.history.push(`/profile/${data.username}`);
    }
  }

  _onCancelButtonClick() {
    this.props.onCancel();
  }

  static _renderForm(form, key) {
    return [
      <Field
        key={key}
        component={TextView}
        {...form.field}
        {...form.field.props}
      />,
    ];
  }

  _renderChangeInformationForm() {
    const { classes, submitSucceeded } = this.props;
    return [
      <Fragment key={1}>
        {Object.keys(fields).map(key =>
          Information._renderForm(fields[key], key),
        )}
      </Fragment>,
      <FormHelperText key={2} className={classes.error}>
        {submitSucceeded && this.state.formErrors}
      </FormHelperText>,
    ];
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
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            {this._renderChangeInformationForm()}
          </Grid>
          <Grid item xs={12} className={classes.modalFooter}>
            {loading
              ? Information._renderLoading()
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

const mapStateToProps = ({ api }) => ({
  initialValues: api.user.data,
  user: api.user,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({
    userId,
    username,
    name,
    firstname,
    lastname,
    bio,
    city,
    country,
  }) =>
    Promise.all([
      dispatch(
        tokenInjector(
          setUsername({
            userId,
            username: trimText(username),
          }),
        ),
      ),
      dispatch(
        tokenInjector(
          setUserInformation({
            userId,
            name: trimText(name),
            firstname: trimText(firstname),
            lastname: trimText(lastname),
            bio: trimText(bio),
            city: trimText(city),
            country: trimText(country),
          }),
        ),
      ),
    ]),
});

Information.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.any,
  history: PropTypes.object,
  submitSucceeded: PropTypes.any,
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'editProfileInformationForm',
    enableReinitialize: true,
  }),
)(Information);
