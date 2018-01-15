import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import CircleIcon from 'react-icons/lib/fa/circle';
import styles from './styles';

class OnlineUsers extends Component {
  render() {
    const { classes, currentStation: { online_count } } = this.props;
    return (
      <div className={classes.onlineCountContainer}>
        <CircleIcon className={classNames(classes.onlineIcon)} />
        <Typography
          type={'caption'}
          align={'left'}
          className={classes.stationOnlineCountText}
        >
          {online_count || '-'} online
        </Typography>
      </div>
    );
  }
}

OnlineUsers.propTypes = {
  classes: PropTypes.object,
  currentStation: PropTypes.object,
};

OnlineUsers.defaultProps = {};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation,
  userId: api.user.data.userId,
});

export default compose(withStyles(styles), connect(mapStateToProps))(
  OnlineUsers,
);
