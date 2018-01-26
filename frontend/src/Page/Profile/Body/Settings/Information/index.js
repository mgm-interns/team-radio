import React, { Component } from 'react';
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
import { maxLength15, required } from 'Util/validate';

import styles from '../styles';

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
    const { user: { username }, user: { error } } = nextProps;

    if (error !== null) {
      this.setState({
        formErrors: error.response.message,
      });
    } else {
      this.setState({
        formErrors: null,
      });
    }

    if (username !== this.props.user.username) {
      this.props.history.push(`/profile/${username}`);
    }
  }

  _onCancelButtonClick() {
    this.props.onCancel();
  }

  _renderChangeInformationForm() {
    const { classes, submitSucceeded } = this.props;
    return [
      <Field
        key={1}
        name="name"
        placeholder="Display name"
        type="text"
        component={TextView}
        label="Display name"
        validate={[required, maxLength15]}
      />,
      <Field
        key={2}
        name="username"
        placeholder="Username"
        type="text"
        component={TextView}
        label="Username"
        validate={[required]}
      />,
      <Field
        key={3}
        name="email"
        placeholder="Email"
        type="email"
        component={TextView}
        label="Email"
        disabled
      />,
      <Field
        key={4}
        name="firstname"
        placeholder="First name"
        type="text"
        component={TextView}
        label="First name"
      />,
      <Field
        key={5}
        name="lastname"
        placeholder="Last name"
        type="text"
        component={TextView}
        label="Last name"
      />,
      <Field
        key={6}
        name="bio"
        placeholder="Bio"
        type="text"
        component={TextView}
        label="Bio"
      />,
      <Field
        key={7}
        name="city"
        placeholder="City"
        type="text"
        component={TextView}
        label="City"
      />,
      <Field
        key={8}
        name="country"
        placeholder="Country"
        type="text"
        component={TextView}
        label="Country"
      />,
      <FormHelperText key={10} className={classes.error}>
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
            <Button
              color="primary"
              onClick={this._onCancelButtonClick}
              className={classes.button}
            >
              Cancel
            </Button>
            {loading ? (
              Information._renderLoading()
            ) : (
              <Button
                disabled={pristine || submitting}
                color="primary"
                type="submit"
                className={classes.button}
              >
                Save
              </Button>
            )}
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
        setUsername({
          userId,
          username: trimText(username),
        }),
      ),
      dispatch(
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
  history: PropTypes.any,
  submitSucceeded: PropTypes.any,
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'editProfileInformationForm',
    enableReinitialize: true,
  }),
)(Information);
