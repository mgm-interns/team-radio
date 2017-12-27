import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { withStyles } from 'material-ui/styles';
import styles from './styles';

import { NavBar } from '../../../Component';
import { error } from 'util';

import { fetchUser } from 'Redux/api/user';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formErrors: {},
    };
    this._handleEmailChanged = this._handleEmailChanged.bind(this);
    this._handlePasswordChanged = this._handlePasswordChanged.bind(this);

    this._submit = this._submit.bind(this);
  }

  _handleEmailChanged(e) {
    this.setState({ email: e.target.value });
  }

  _handlePasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  _submit() {
    if (this._validate()) {
      // console.log('submit');
      let {email, password} = this.state;
      this.props.login({email, password});
    }
  }

  _validate() {
    const { email, password, formErrors } = this.state;
    let newFormErrors = {};
    let isValid = true;

    if (!email) {
      newFormErrors.email = 'Email is required';
      isValid = false;
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newFormErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!password) {
      newFormErrors.password = 'Password is required';
      isValid = false;
    }

    this.setState({
      formErrors: newFormErrors,
    });

    return isValid;
    // console.log(newFormErrors);
  }

  componentWillReceiveProps(nextProps) {
    const response = nextProps.fetchUserResponse;
    const { error } = response;
    if(response.error != null) {
      this.setState((prevState) => {
        return {
          formErrors: {
            message: error.response.message
          }
        }
      })
    }
    else if(!response.loading) {
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/');
    }
  }

  render() {
    const { classes, loading, error } = this.props;

    return (
      <div>
        <NavBar />
        <Grid container direction="column" className={classes.container}>
          <Grid container className={classes.foreground}>
            <Grid item xs={11} sm={5} className={classes.cardWrapper}>
              <Card raised className={classes.cardForm}>
                <CardContent>
                  <Grid style={{ paddingBottom: '2em' }}>
                    <Typography type="headline" component="h2">
                      Log in
                    </Typography>
                    <Typography component="p">
                      for listening and sharing music
                    </Typography>
                  </Grid>

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="email" required>
                      Email
                    </InputLabel>
                    <Input
                      required
                      id="email"
                      placeholder="Enter your email"
                      margin="normal"
                      autoFocus={true}
                      onChange={this._handleEmailChanged}
                      value={this.state.email}
                    />
                    <FormHelperText className={classes.error}>
                      {this.state.formErrors.email}

                      {/* {error && error.response && error.response.error.name} */}
                    </FormHelperText>
                  </FormControl>

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      required
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      margin="normal"
                      onChange={this._handlePasswordChanged}
                      value={this.state.password}
                    />
                    <FormHelperText className={classes.error}>
                      {this.state.formErrors.password}
                      {/* {error && error.response && error.response.error.name} */}
                    </FormHelperText>
                  </FormControl>

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
                      onClick={this._submit}
                      className={classes.buttonSend}
                    >
                      Log in
                    </Button>
                  )}
                </CardActions>
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
  classes: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  addStation: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps)  => ({
  login: (user) => {
    dispatch(fetchUser(user));
  }
});

const mapStateToProps = (state) => {
  // console.log(state.api.user.fetch);
  return {
    fetchUserResponse: state.api.user.fetch
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));

