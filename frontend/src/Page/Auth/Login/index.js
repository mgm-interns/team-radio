import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormHelperText } from 'material-ui/Form';
// import Input, { InputLabel } from 'material-ui/Input';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { withStyles } from 'material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import { NavBar, GoogleLogin } from 'Component';
import { saveAuthenticationState, loadAuthenticationState } from 'Config';
import { fetchUser } from 'Redux/api/user';
// import { login } from 'Redux/page/user/actions';
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

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.loading = this.loading.bind(this);
    // this.logout = this.logout.bind(this);
  }

  success(response) {
    if (response) {
      this.setState({ isLoggedIn: true });
      const { googleId, accessToken, tokenId } = response;
      saveAuthenticationState({ googleId, accessToken, tokenId });
      this.props.history.push('/');
    }
  }

  error(response) {
    console.error(response);
  }

  loading() {
    console.log('loading');
  }

  // logout() {
  //   console.log('logout');
  //   this.setState({ isLoggedIn: false });
  //   removeAuthenticationState();
  // }

  // _submit(e) {
  //   e.preventDefault();
  //   if (this._validate()) {
  //     // console.log('submit');
  //     let { email, password } = this.state;
  //     this.props.login({ email, password });
  //   }
  // }

  componentDidMount() {
    if (loadAuthenticationState()) {
      this.setState(() => ({ isLoggedIn: true }));
      console.log('Auth - Login', this.state.isLoggedIn);
    }
  }

  componentWillReceiveProps(nextProps) {
    const response = nextProps.fetchUserResponse;
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
                    <Grid style={{ paddingBottom: '2em' }}>
                      <Typography type="headline" component="h2">
                        Log in
                      </Typography>
                      <Typography component="p">
                        for listening and sharing music
                      </Typography>
                    </Grid>

                    <Grid style={{ paddingBottom: '2em' }}>
                      <GoogleLogin
                        onSuccess={this.success}
                        onFailure={this.error}
                        // onRequest={this.loading}
                        offline={false}
                        responseType="id_token"
                        isSignedIn
                        disabled={this.state.isLoggedIn}
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
                  <CardActions className={classes.cardButton}>
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
  fetchUserResponse: state.api.user.fetch,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'loginForm',
    validate,
  })(withStyles(styles)(Login)),
);
