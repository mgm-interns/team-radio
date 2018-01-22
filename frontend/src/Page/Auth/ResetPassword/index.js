import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { NavBar, TextView } from 'Component';
import { withNotification } from 'Component/Notification';
import { minLength6, required, registerValidate } from 'Util/validate';
import { resetPassword } from 'Redux/api/user/user';
import styles from './styles';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: null,
      successMessage: null,
    };

    this._renderBackground = this._renderBackground.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user: { error, data } } = nextProps;

    if (error) {
      this.setState({
        formError: error.response,
      });
    } else {
      this.setState({
        formError: null,
      });

      if (data !== this.props.user.data && data) {
        this.setState({
          successMessage: data.message,
        });
      }
    }
  }

  _renderBackground() {
    const { classes } = this.props;
    return (
      <Grid item xs className={classes.backgroundImg}>
        <img
          src="https://images.unsplash.com/photo-1495733715281-6201a6b6cc02?auto=format&fit=crop&w=1950&q=80"
          alt="Team Radio - Cover"
          className={classes.backgroundImg}
        />
      </Grid>
    );
  }

  render() {
    const { classes, handleSubmit, submitting, submitSucceeded } = this.props;
    const { successMessage } = this.state;

    return [
      <NavBar key={1} />,
      <Grid key={2} container direction="column" className={classes.container}>
        <Grid container className={classes.foreground}>
          <Grid item xs={11} sm={8} lg={5} className={classes.cardWrapper}>
            <Card raised className={classes.cardForm}>
              {successMessage ? (
                <div>
                  <Typography type="headline" component="h2">
                    Check your email
                  </Typography>
                  <Typography component="p" className={classes.text}>
                    We have sent you an email. Click the link in the email to
                    reset your password.
                  </Typography>
                  <Typography component="p" className={classes.text}>
                    If you do not see the email, check other places it might be,
                    like your junk, spam, social, or other folders.
                  </Typography>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <Grid
                      style={{
                        paddingBottom: '1em',
                      }}
                    >
                      <Typography type="headline" component="h2">
                        Reset your password
                      </Typography>
                      {/* <Typography component="p">
                        Please enter the email address registered on your
                        account.
                      </Typography> */}
                    </Grid>
                    <Grid>
                      <Field
                        key={4}
                        name="password"
                        placeholder="Must be at least 6 characters"
                        type="password"
                        component={TextView}
                        label="Password"
                        validate={[required, minLength6]}
                      />
                      <Field
                        key={5}
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        type="password"
                        component={TextView}
                        label="Confirm Password"
                        validate={[required]}
                      />
                      <FormHelperText className={classes.error}>
                        {submitSucceeded && this.state.formError}
                      </FormHelperText>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        className={classes.cardActionContainer}
                      >
                        {submitting ? (
                          <CircularProgress />
                        ) : (
                          <Button
                            raised
                            color="primary"
                            type="submit"
                            className={classes.buttonSend}
                          >
                            Reset password
                          </Button>
                        )}
                      </Grid>
                    </Grid>{' '}
                  </CardActions>
                </form>
              )}
            </Card>
          </Grid>
          {this._renderBackground()}
        </Grid>
      </Grid>,
    ];
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.any,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.any,
  user: PropTypes.any,
};

const mapStateToProps = state => ({
  user: state.api.user,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(resetPassword(values)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'forgotForm',
    validate: registerValidate,
  }),
  withStyles(styles),
  withNotification,
)(ResetPassword);
