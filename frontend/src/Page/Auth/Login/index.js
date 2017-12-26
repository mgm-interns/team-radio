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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      formErrors: {},
    };
    this._handleUserNameChanged = this._handleUserNameChanged.bind(this);
    this._handlePasswordChanged = this._handlePasswordChanged.bind(this);

    this._submit = this._submit.bind(this);
  }

  _handleUserNameChanged(e) {
    this.setState({ userName: e.target.value });
  }

  _handlePasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  _submit() {
    if (this._validate()) {
      console.log('submit');
    }
  }

  _validate() {
    const { userName, password, formErrors } = this.state;
    let newFormErrors = {};

    if (!userName) {
      newFormErrors.userName = 'Username is required';
    }

    if (!password) {
      newFormErrors.password = 'Password is required';
    }

    this.setState({
      formErrors: newFormErrors,
    });

    console.log(newFormErrors);
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
                    <InputLabel htmlFor="user-name" required>
                      Username
                    </InputLabel>
                    <Input
                      required
                      id="user-name"
                      placeholder="Enter your username"
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

export default withStyles(styles)(Login);
