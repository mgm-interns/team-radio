import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Notification } from 'Component';
import { compose } from 'redux';
import { verifyToken } from 'Redux/api/user/user';
import { removeAuthenticationState } from 'Configuration';
import Router from './Router';
import styles from './styles';

class App extends Component {
  componentDidMount() {
    this.props.getAuth({ token: localStorage.getItem('token') });
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps.user;

    if (error) {
      const { response: { tokenError } } = error;
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
});

const mapStateToProps = state => ({
  user: state.api.user,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(App);
