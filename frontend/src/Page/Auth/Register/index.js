import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Icon from 'material-ui/Icon';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import DoneIcon from 'material-ui-icons/Done';

import { withStyles } from 'material-ui/styles';
import styles from './styles';

import { NavBar } from '../../../Component';
import { error } from 'util';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      formErrors: {},
      benefits: [
        'Edit profile',
        'Be rewarded',
        'Play more songs than these anonymous freaks',
        'See some information of the past activities',
      ],
    };
    this._handleUserNameChanged = this._handleUserNameChanged.bind(this);
    this._handleEmailChanged = this._handleEmailChanged.bind(this);
    this._handlePasswordChanged = this._handlePasswordChanged.bind(this);
    this._handleConfirmPasswordChanged = this._handleConfirmPasswordChanged.bind(
      this,
    );
    this._submit = this._submit.bind(this);
  }

  _handleUserNameChanged(e) {
    this.setState({ userName: e.target.value });
  }
  _handleEmailChanged(e) {
    this.setState({ email: e.target.value });
  }

  _handlePasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  _handleConfirmPasswordChanged(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  _submit() {
    if (this._validate()) {
      console.log('submit');
    }
  }

  _validate() {
    const {
      userName,
      email,
      password,
      confirmPassword,
      formErrors,
    } = this.state;
    let newFormErrors = {};
    if (!userName) {
      newFormErrors.userName = 'Username is required';
    }

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newFormErrors.email = 'Invalid email address';
    }

    if (!password) {
      newFormErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newFormErrors.password = 'Password must be at least 6 characters';
    } else if (confirmPassword && password != confirmPassword) {
      newFormErrors.confirmPassword =
        'Password and confirm password does not match';
    }

    if (!confirmPassword) {
      newFormErrors.confirmPassword = 'Confirm Password is required';
    }

    this.setState({
      formErrors: newFormErrors,
    });

    console.log(newFormErrors);
  }

  render() {
    const { classes, loading, error } = this.props;
    const { benefits } = this.state;

    return (
      <div>
        <NavBar />
        <Grid container direction="column" className={classes.container}>
          <Grid container className={classes.foreground}>
            <Grid
              item
              xs={0}
              sm={5}
              className={[classes.cardWrapper, classes.cardInfoWrapper]}
            >
              <Card className={classes.cardInfo}>
                <CardContent>
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.text}
                  >
                    A registered user can:
                  </Typography>
                  <ul className={classes.listWrapper}>
                    {benefits.map(benefit => (
                      <li className={classes.listItem}>
                        <DoneIcon />
                        <span className={classes.listText}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={11} sm={5} className={classes.cardWrapper}>
              <Card raised className={classes.cardForm}>
                <CardContent>
                  <Grid style={{ paddingBottom: '2em' }}>
                    <Typography type="headline" component="h2">
                      Sign Up
                    </Typography>
                    <Typography component="p">
                      to get the most out of Team Radio
                    </Typography>
                  </Grid>

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="user-name" required>
                      Username
                    </InputLabel>
                    <Input
                      required
                      id="user-name"
                      placeholder="Choose a username"
                      margin="normal"
                      autoFocus={true}
                      onChange={this._handleUserNameChanged}
                      value={this.state.userName}
                    />
                    <FormHelperText className={classes.error}>
                      {this.state.formErrors.userName}

                      {/* {error && error.response && error.response.error.name} */}
                    </FormHelperText>
                  </FormControl>

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      id="email"
                      placeholder="hello@example.com"
                      margin="normal"
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
                      placeholder="Must be at least 6 characters"
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

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="confirm-password">
                      Confirm Password
                    </InputLabel>
                    <Input
                      placeholder="Re-enter your password"
                      type="password"
                      margin="normal"
                      onChange={this._handleConfirmPasswordChanged}
                      value={this.state.confirmPassword}
                    />
                    <FormHelperText className={classes.error}>
                      {this.state.formErrors.confirmPassword}
                      {/* {error && error.response && error.response.error.name} */}
                    </FormHelperText>
                  </FormControl>
                </CardContent>
                <CardActions
                  className={classes.cardButton}
                  style={{ justifyContent: 'flex-end' }}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      raised
                      color="primary"
                      onClick={this._submit}
                      className={classes.buttonSend}
                    >
                      Sign Up
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs className={classes.backgroundImg}>
              <img
                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=2250&q=80"
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

Register.propTypes = {
  classes: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  addStation: PropTypes.func,
};

export default withStyles(styles)(Register);
