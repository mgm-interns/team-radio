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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      fullName: '',
      email: '',
      organizationName: '',
      benefits: [
        'Edit profile',
        'Be rewarded',
        'Play more songs than these anonymous freaks',
        'See some information of the past activities',
      ],
    };
    this._handleUserNameChanged = this._handleUserNameChanged.bind(this);
    this._handleEmailChanged = this._handleEmailChanged.bind(this);
    this._handleFullNameChanged = this._handleFullNameChanged.bind(this);
    this._handleOrganizationNameChanged = this._handleOrganizationNameChanged.bind(
      this,
    );
    this._submit = this._submit.bind(this);
  }

  _handleUserNameChanged(e) {
    this.setState({ userName: e.target.value });
  }
  _handleFullNameChanged(e) {
    this.setState({ fullName: e.target.value });
  }

  _handleEmailChanged(e) {
    this.setState({ email: e.target.value });
  }

  _handleOrganizationNameChanged(e) {
    this.setState({ organizationName: e.target.value });
  }

  _submit() {}

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
                    <FormHelperText>
                      {error && error.response && error.response.error.name}
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
                    <FormHelperText>
                      {error && error.response && error.response.error.name}
                    </FormHelperText>
                  </FormControl>

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      placeholder="Must be at least 6 characters"
                      type="password"
                      margin="normal"
                      onChange={this._handleFullNameChanged}
                      value={this.state.fullName}
                    />
                    <FormHelperText>
                      {error && error.response && error.response.error.name}
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
                      onChange={this._handleOrganizationNameChanged}
                      value={this.state.organizationName}
                    />
                    <FormHelperText>
                      {error && error.response && error.response.error.name}
                    </FormHelperText>
                  </FormControl>
                </CardContent>
                <CardActions>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      raised
                      color="primary"
                      // onClick={this._submit}
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
