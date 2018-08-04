import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Notification, NativeAppAds } from 'Component';
import { compose } from 'redux';
import { verifyToken } from 'Redux/api/user/user';
import { removeAuthenticationState } from 'Configuration';
import Router from './Router';
import styles from './styles';
import { sendUserId } from '../Redux/api/user/user';

class App extends Component {
  componentWillMount() {
    this.props.getAuth({ token: localStorage.getItem('token') });
    this.props.sendUserId(localStorage.getItem('userId'));
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps.user;

    if (error) {
      const {
        response: { tokenError },
      } = error;
      if (tokenError) {
        removeAuthenticationState();
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Router />
        <Notification.AppNotification />
        <NativeAppAds />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.any,
  getAuth: PropTypes.any,
  user: PropTypes.any,
};

const mapDispatchToProps = dispatch => ({
  getAuth: token => {
    dispatch(verifyToken(token));
  },
  sendUserId: userId => {
    dispatch(sendUserId(userId));
  },
});

const mapStateToProps = state => ({
  user: state.api.user,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(App);
