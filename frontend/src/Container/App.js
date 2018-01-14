import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Notification, Scrollbar } from 'Component';
import { compose } from 'redux';
import { verifyToken } from 'Redux/api/user/actions';
import Router from './Router';
import styles from './styles';

class App extends Component {
  componentDidMount() {
    this.props.getAuth();
  }

  render() {
    const { classes } = this.props;
    return (
      <Scrollbar
        level={'App'}
        // speed={0}
        className={classes.container}
        contentClassName={classes.content}
        horizontal={false}
        smoothScrolling
        stopScrollPropagation
      >
        <Router scrollbarRef={this.scrollbarRef} />
        <Notification.AppNotification />
      </Scrollbar>
    );
  }
}

App.propTypes = {
  classes: PropTypes.any,
  getAuth: PropTypes.any,
};

const mapDispatchToProps = dispatch => ({
  getAuth: () => {
    dispatch(verifyToken());
  },
});

const mapStateToProps = state => ({
  user: state.api.user,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(App);
