import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormHelperText } from 'material-ui/Form';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { withStyles } from 'material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import { fetchUser, addUserWithSocialAccount } from 'Redux/api/user/actions';
import { NavBar, GoogleLogin, FacebookLogin, TextView } from 'Component';
import { withNotification } from 'Component/Notification';
import {
  saveAuthenticationState,
  loadAuthenticationState,
} from 'Configuration';
import { email, required } from 'Util/validate';
import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
      isLoggedIn: false,
    };

    this._showNotification = this._showNotification.bind(this);
    this._onLoginSocialClick = this._onLoginSocialClick.bind(this);
    this._onLoginSocialFailure = this._onLoginSocialFailure.bind(this);
    this._renderHeadline = this._renderHeadline.bind(this);
    this._renderLoginSocial = this._renderLoginSocial.bind(this);
    this._renderLoginLocalForm = this._renderLoginLocalForm.bind(this);
    this._renderLoginLocalActions = this._renderLoginLocalActions.bind(this);
    this._renderBackground = this._renderBackground.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchUserResponse: { error, data, isAuthenticated } } = nextProps;
    const { fetchUserResponse: { data: { token } } } = this.props;
    if (error !== null) {
      this.setState({
        formErrors: {
          message: error.response.message,
        },
      });
    } else if (isAuthenticated && token !== data.token) {
      this._showNotification('Login successfully!');
      saveAuthenticationState(data);
      if (window.history.length > 2) {
        this.props.history.go(-1);
      } else {
        this.props.history.replace('/');
      }
    }
    if (!loadAuthenticationState()) {
      this.setState({
        isLoggedIn: false,
      });
    }
  }

  _showNotification(content) {
    const { notification } = this.props;

    notification.app.success({
      message: content,
    });
    // notification.browser.success({
    //   message: content,
    // });
  }

  _onLoginSocialClick(response) {
    if (response) {
      this.setState({
        isLoggedIn: true,
      });
      const { profileObj, authResponse } = response;

      // handle data
      saveAuthenticationState(authResponse);
      this.props.addUserWithSocialAccount(profileObj);
    }
  }

  _onLoginSocialFailure(response) {
    if (response) {
      const socialErrors = {
        message: 'Login failed!',
      };
      this.setState({
        formErrors: socialErrors,
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      formErrors: {},
    });
  }

  _renderHeadline() {
    return (
      <Grid
        style={{
          paddingBottom: '1em',
        }}
      >
        <Typography type="headline" component="h2">
          Log in
        </Typography>{' '}
        <Typography component="p">for listening and sharing music </Typography>{' '}
      </Grid>
    );
  }

  _renderLoginSocial() {
    return (
      <Grid
        style={{
          paddingBottom: '1em',
        }}
      >
        <FacebookLogin
          fields="name,email,picture"
          autoLoad={false}
          scope="email,public_profile,user_friends"
          onSuccess={this._onLoginSocialClick}
          isDisabled={this.state.isLoggedIn}
          onFailure={this._onLoginSocialFailure}
        />{' '}
        <div
          style={{
            height: 16,
          }}
        />{' '}
        <GoogleLogin
          onSuccess={this._onLoginSocialClick}
          offline={false}
          responseType="id_token"
          isSignedIn={this.state.isLoggedIn}
          isDisabled={this.state.isLoggedIn}
          prompt="consent"
          onFailure={this._onLoginSocialFailure}
          autoLoad={false}
          onSignedIn={this._onSignedIn}
        />{' '}
      </Grid>
    );
  }

  _renderLoginLocalForm() {
    const { classes, submitSucceeded } = this.props;
    // console.log(this.props);
    return (
      <Grid>
        <Field
          name="email"
          placeholde="Email"
          type="text"
          component={TextView}
          label="Email"
          validate={[required, email]}
        />{' '}
        <Field
          name="password"
          placeholder="Password"
          type="password"
          component={TextView}
          label="Password"
          validate={required}
        />
        <FormHelperText className={classes.error}>
          {submitSucceeded && this.state.formErrors.message}{' '}
        </FormHelperText>{' '}
      </Grid>
    );
  }

  _renderLoginLocalActions() {
    const { classes, fetchUserResponse: { loading } } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} className={classes.cardActionContainer}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              raised
              color="primary"
              type="submit"
              className={classes.buttonSend}
              disabled={this.state.isLoggedIn}
            >
              Log in
            </Button>
          )}{' '}
          <FormHelperText className={classes.callout}>
            <span> Not a member? </span>{' '}
            <Link to="/auth/register" className={classes.link}>
              Create an account{' '}
            </Link>{' '}
          </FormHelperText>{' '}
        </Grid>{' '}
      </Grid>
    );
  }

  _renderBackground() {
    const { classes } = this.props;
    return (
      <Grid item xs className={classes.backgroundImg}>
        <img
          src="https://images.unsplash.com/photo-1512692505538-1e7bb8980a77?auto=format&fit=crop&w=2600&q=80"
          alt="Team Radio - Cover"
          className={classes.backgroundImg}
        />{' '}
      </Grid>
    );
  }

  render() {
    const { classes, handleSubmit } = this.props;

    return [
      <NavBar key={1} />,
      <Grid key={2} container direction="column" className={classes.container}>
        <Grid container className={classes.foreground}>
          <Grid item xs={11} sm={5} className={classes.cardWrapper}>
            <Card raised className={classes.cardForm}>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  {' '}
                  {this._renderHeadline()} {this._renderLoginSocial()}{' '}
                  {this._renderLoginLocalForm()}{' '}
                </CardContent>{' '}
                <CardActions> {this._renderLoginLocalActions()} </CardActions>{' '}
              </form>{' '}
            </Card>{' '}
          </Grid>{' '}
          {this._renderBackground()}{' '}
        </Grid>{' '}
      </Grid>,
    ];
  }
}

Login.propTypes = {
  fetchUserResponse: PropTypes.any,
  history: PropTypes.any,
  classes: PropTypes.any,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.any,
  submitSucceeded: PropTypes.any,
  notification: PropTypes.object,
  addUserWithSocialAccount: PropTypes.func,
};

const mapStateToProps = state => ({
  fetchUserResponse: state.api.user,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(fetchUser(data)),
  addUserWithSocialAccount: data => dispatch(addUserWithSocialAccount(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'loginForm',
  }),
  withStyles(styles),
  withNotification,
)(Login);
