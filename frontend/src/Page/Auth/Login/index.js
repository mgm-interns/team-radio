import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormHelperText } from 'material-ui/Form';
// import Input, { InputLabel } from 'material-ui/Input';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { withStyles } from 'material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import { NavBar, GoogleLogin, FacebookLogin } from 'Component';
import { saveAuthenticationState, loadAuthenticationState } from 'Config';
import { fetchUser, addUser, addUserWithSocialAccount } from 'Redux/api/user/actions';
import sleep from 'Util/sleep';

import { connect } from 'react-redux';
import styles from './styles';
import TextView from '../TextView';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
      isLoggedIn: false,
      // loading: false,
    };

    this.error = this.error.bind(this);
    this.loading = this.loading.bind(this);
    this.responseSocial = this.responseSocial.bind(this);
  }

  responseSocial(response) {
    if (response) {
      this.setState({ isLoggedIn: true });
      const { profileObj, authResponse } = response;

      // handle data
      saveAuthenticationState(authResponse);
      this.props.dispatch(addUserWithSocialAccount(profileObj));
      // this.props.dispatch(fetchUser());
      // console.log(this.props.fetchUserResponse());
    }
  }

  error(response) {
    console.error(response);
  }

  loading() {
    console.info('loading');
    return <CircularProgress />;
  }

  componentWillReceiveProps(nextProps) {
    const response = nextProps.fetchUserResponse;
    console.log(response);
    const { error } = response;
    if (response.error != null) {
      this.setState({
        formErrors: {
          message: error.response.message,
        },
      });
    } else if (response.data.token) {
      saveAuthenticationState(response.data);
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    this.setState(() => ({
      formErrors: {},
      isLoggedIn: false,
    }));
  }

  render() {
    const { classes, loading, handleSubmit } = this.props;

    return (
      <div>
        <NavBar />
        <Grid container direction="column" className={classes.container}>
          <Grid container className={classes.foreground}>
            <Grid item xs={11} sm={5} className={classes.cardWrapper}>
              <Card raised className={classes.cardForm}>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <Grid style={{ paddingBottom: '1em' }}>
                      <Typography type="headline" component="h2">
                        Log in
                      </Typography>
                      <Typography component="p">
                        for listening and sharing music
                      </Typography>
                    </Grid>
                    <Grid>
                      <FacebookLogin
                        fields="name,email,picture"
                        // scope={}
                        autoLoad={false}
                        onSuccess={this.responseSocial}
                        isDisabled={this.state.isLoggedIn}
                        // icon="fa-facebook"
                      />
                      <div style={{ height: 16 }} />
                      <GoogleLogin
                        onSuccess={this.responseSocial}
                        onFailure={this.error}
                        onRequest={this.loading}
                        offline={false}
                        responseType="id_token"
                        isSignedIn
                        isDisabled={this.state.isLoggedIn}
                        prompt="consent"
                        buttonText="Login with Google"
                      />
                    </Grid>

                    <Field
                      name="email"
                      placeholde="Email"
                      type="text"
                      component={TextView}
                      label="Email"
                    />
                    <Field
                      name="password"
                      placeholder="Password"
                      type="password"
                      component={TextView}
                      label="Password"
                    />
                    <FormHelperText className={classes.error}>
                      {this.state.formErrors.message}
                    </FormHelperText>
                  </CardContent>
                  <CardActions>
                    <Grid container>
                      <Grid item xs={12}>
                        {loading ? (
                          <CircularProgress />
                        ) : (
                          <Button
                            raised
                            color="primary"
                            type="submit"
                            className={classes.buttonSend}
                          >
                            Log in
                          </Button>
                        )}

                        <FormHelperText className={classes.callout}>
                          <span>Not a member?</span>
                          <Link to="/auth/register">Create an account</Link>
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </CardActions>
                </form>
              </Card>
            </Grid>

            <Grid item xs className={classes.backgroundImg}>
              <img
                src="https://images.unsplash.com/photo-1512692505538-1e7bb8980a77?auto=format&fit=crop&w=2600&q=80"
                alt="Team Radio - Cover"
                className={classes.backgroundImg}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  fetchUserResponse: PropTypes.any,
  history: PropTypes.any,
  classes: PropTypes.any,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.any,
  submitting: PropTypes.any,
  login: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onSubmit: user => {
    dispatch(fetchUser(user));
  },
});

const mapStateToProps = state => ({
  fetchUserResponse: state.api.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'loginForm',
    validate,
  })(withStyles(styles)(Login)),
);
