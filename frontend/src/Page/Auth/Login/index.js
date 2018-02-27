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
import { getUser, addUserBySocialAccount } from 'Redux/api/user/user';
import { NavBar, GoogleLogin, FacebookLogin, TextView } from 'Component';
import { withNotification } from 'Component/Notification';
import * as constant from '../../../Util/constants';
import {
  saveAuthenticationState,
  loadAuthenticationState,
} from 'Configuration';

import fields from './fields';
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
    this._renderLoginSocial = this._renderLoginSocial.bind(this);
    this._renderLoginLocalForm = this._renderLoginLocalForm.bind(this);
    this._renderLoginLocalActions = this._renderLoginLocalActions.bind(this);
    this._renderBackground = this._renderBackground.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    const { getUserResponse: { error, data, isAuthenticated } } = nextProps;
    const { getUserResponse: { data: { token } } } = this.props;

    if (error) {
      this.setState({
        formErrors: {
          message: error.response.message,
        },
      });
    }

    if (isAuthenticated && token !== data.token) {
      localStorage.setItem(constant.LOCAL_STORAGE_ANONYMOUS_STATIONS, '[]');
      this._showNotification('Login successfully!');
      await saveAuthenticationState(data);
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

  componentWillMount() {
    if (loadAuthenticationState()) {
      this.props.history.replace('/');
    }
  }

  _showNotification(content) {
    const { notification } = this.props;

    notification.app.success({
      message: content,
    });
  }

  _onLoginSocialClick(response) {
    if (response) {
      this.setState({
        isLoggedIn: true,
      });

      this.props.addUserBySocialAccount(response.profileObj);
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

  static _renderHeadline() {
    return (
      <Grid
        style={{
          paddingBottom: '1em',
        }}
      >
        <Typography type="headline" component="h2">
          Log in
        </Typography>
        <Typography component="p">for listening and sharing music </Typography>
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
          fields="name,email,picture,cover,gender"
          autoLoad={false}
          scope="email,public_profile"
          onSuccess={this._onLoginSocialClick}
          isDisabled={this.state.isLoggedIn}
          onFailure={this._onLoginSocialFailure}
        />
        <div
          style={{
            height: 16,
          }}
        />
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
        />
      </Grid>
    );
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

  _renderLoginLocalForm() {
    const { classes, submitSucceeded } = this.props;
    return (
      <Grid>
        {Object.keys(fields).map(key => Login._renderForm(fields[key], key))}
        <FormHelperText className={classes.error}>
          {submitSucceeded && this.state.formErrors.message}
        </FormHelperText>
      </Grid>
    );
  }

  _renderLoginLocalActions() {
    const { classes, submitting } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} className={classes.cardActionContainer}>
          {submitting ? (
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
          )}
          <FormHelperText className={classes.callout}>
            <Link to="/auth/forgotpassword" className={classes.link}>
              Forgot your password?
            </Link>
            <Link to="/auth/register" className={classes.link}>
              Create an account
            </Link>
          </FormHelperText>
        </Grid>
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
        />
      </Grid>
    );
  }

  render() {
    const { classes, handleSubmit } = this.props;

    return [
      <NavBar key={1} />,
      <Grid key={2} container direction="column" className={classes.container}>
        <Grid container className={classes.foreground}>
          <Grid item xs={11} sm={8} lg={5} className={classes.cardWrapper}>
            <Card raised className={classes.cardForm}>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  {Login._renderHeadline()} {this._renderLoginSocial()}
                  {this._renderLoginLocalForm()}
                </CardContent>
                <CardActions> {this._renderLoginLocalActions()} </CardActions>
              </form>
            </Card>
          </Grid>
          {this._renderBackground()}
        </Grid>
      </Grid>,
    ];
  }
}

Login.propTypes = {
  getUserResponse: PropTypes.any,
  history: PropTypes.object,
  classes: PropTypes.object,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitSucceeded: PropTypes.any,
  notification: PropTypes.object,
  addUserBySocialAccount: PropTypes.func,
  submitting: PropTypes.bool,
};

const mapStateToProps = state => ({
  getUserResponse: state.api.user,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(getUser(data)),
  addUserBySocialAccount: data => dispatch(addUserBySocialAccount({...data, localstations: localStorage.getItem(constant.LOCAL_STORAGE_ANONYMOUS_STATIONS)})),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'loginForm',
  }),
  withStyles(styles),
  withNotification,
)(Login);
