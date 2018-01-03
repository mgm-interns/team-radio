import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { withStyles } from 'material-ui/styles';
import { addUser } from 'Redux/api/user/actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormHelperText } from 'material-ui/Form';
import { NavBar } from 'Component';
import { saveAuthenticationState } from 'Config';

import styles from './styles';
import TextView from '../TextView';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be at least 6 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password and confirm password does not match';
  }

  return errors;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asyncError: '',
      benefits: [
        'Edit profile',
        'Be rewarded',
        'Play more songs than these anonymous freaks',
        'See some information of the past activities',
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    const response = nextProps.addUserResponse;
    console.log(response);
    const { error } = response;
    if (error != null) {
      this.setState({
        asyncError: error.response.message,
      });
    } else if (response.data.token) {
      saveAuthenticationState(response.data);
      this.props.history.push('/');
    }
  }

  render() {
    const { classes, loading, handleSubmit, submitting } = this.props;
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
                    {benefits.map((benefit, index) => (
                      <li key={index} className={classes.listItem}>
                        <Icon>done</Icon>
                        <span className={classes.listText}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={11} sm={5} className={classes.cardWrapper}>
              <Card raised className={classes.cardForm}>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <Grid style={{ paddingBottom: '2em' }}>
                      <Typography type="headline" component="h2">
                        Sign Up
                      </Typography>
                      <Typography component="p">
                        to get the most out of Team Radio
                      </Typography>
                    </Grid>

                    <Field
                      name="name"
                      placeholder="Enter your name"
                      type="text"
                      component={TextView}
                      label="Name"
                    />

                    <Field
                      name="email"
                      placeholde="hello@example.com"
                      type="text"
                      component={TextView}
                      label="Email"
                    />

                    <Field
                      name="password"
                      placeholder="Must be at least 6 characters"
                      type="password"
                      component={TextView}
                      label="Password"
                    />

                    <Field
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      type="password"
                      component={TextView}
                      label="Confirm Password"
                    />

                    <FormHelperText className={classes.error}>
                      {this.state.asyncError}
                    </FormHelperText>
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
                        type="submit"
                        className={classes.buttonSend}
                        disabled={submitting}
                      >
                        Sign Up
                      </Button>
                    )}
                  </CardActions>
                </form>
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
  addUserResponse: PropTypes.any,
  history: PropTypes.any,
  classes: PropTypes.any,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.any,
  submitting: PropTypes.any,
};

const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    dispatch(addUser(values));
  },
});

const mapStateToProps = state => ({
  addUserResponse: state.api.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'registerForm',
    validate,
  })(withStyles(styles)(Register)),
);
