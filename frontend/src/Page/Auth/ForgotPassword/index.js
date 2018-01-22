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
import { NavBar, GoogleLogin, FacebookLogin, TextView } from 'Component';
import { withNotification } from 'Component/Notification';
import { email, required } from 'Util/validate';
import styles from './styles';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
    };

    this._renderBackground = this._renderBackground.bind(this);
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
    const { classes, handleSubmit, submitting } = this.props;

    return [
      <NavBar key={1} />,
      <Grid key={2} container direction="column" className={classes.container}>
        <Grid container className={classes.foreground}>
          <Grid item xs={11} sm={8} lg={5} className={classes.cardWrapper}>
            <Card raised className={classes.cardForm}>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <Grid
                    style={{
                      paddingBottom: '1em',
                    }}
                  >
                    <Typography type="headline" component="h2">
                      Forgot your password?
                    </Typography>
                    <Typography component="p">
                      Please enter the email address registered on your account.
                    </Typography>
                  </Grid>
                  <Grid>
                    <Field
                      name="email"
                      placeholder="Email"
                      type="text"
                      component={TextView}
                      label="Email"
                      validate={[required, email]}
                    />
                  </Grid>
                </CardContent>
                <CardActions>
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
                        >
                          Reset password
                        </Button>
                      )}
                    </Grid>
                  </Grid>{' '}
                </CardActions>
              </form>
            </Card>
          </Grid>
          {this._renderBackground()}
        </Grid>
      </Grid>,
    ];
  }
}

ForgotPassword.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'forgotForm',
  }),
  withStyles(styles),
  withNotification,
)(ForgotPassword);
