import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import CircleOIcon from 'react-icons/lib/fa/circle-o';
import CircleIcon from 'react-icons/lib/fa/circle';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNotification } from 'Component/Notification';
import { withRouter } from 'react-router-dom';
import withStyles from 'material-ui/styles/withStyles';
import { Images } from 'Theme';
import styles from './styles';

class SwitcherItem extends Component {
  render() {
    const {
      onClick,
      classes,
      isActive,
      station_name,
      station_id,
      currentStation: { station, nowPlaying },
      disableOnlineCount,
    } = this.props;
    let { thumbnail = Images.fixture.avatar1, online_count } = this.props;
    if ((station && station.station_id) === station_id) {
      thumbnail = (nowPlaying && nowPlaying.thumbnail) || thumbnail;

      online_count = this.props.currentStation.online_count; // eslint-disable-line
    }
    return (
      <div
        className={classNames(classes.stationWrapper, {
          [classes.activeStation]: isActive,
        })}
        onClick={() => onClick && onClick({ ...this.props })}
      >
        <div
          className={classes.stationAvatar}
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          {!disableOnlineCount && (
            <div className={classes.stationOnlineCountWrapper}>
              {online_count > 0 ? (
                <CircleIcon
                  className={classNames(classes.onlineIcon, 'active')}
                />
              ) : (
                <CircleOIcon className={classNames(classes.onlineIcon)} />
              )}
              <Typography
                type={'caption'}
                align={'left'}
                className={classes.stationOnlineCountText}
              >
                {online_count || 0} online
              </Typography>
            </div>
          )}
        </div>
        <div className={classes.stationInfo}>
          <Tooltip id={station_id} title={station_name} placement={'right'}>
            <span className={classes.stationTitle}>{station_name}</span>
          </Tooltip>
        </div>
      </div>
    );
  }
}

SwitcherItem.propTypes = {
  onClick: PropTypes.any,
  classes: PropTypes.any,
  disableOnlineCount: PropTypes.bool,
  thumbnail: PropTypes.any,
  isActive: PropTypes.any,
  station_name: PropTypes.any,
  currentStation: PropTypes.object,
  station_id: PropTypes.any,
  online_count: PropTypes.any,
};

SwitcherItem.defaultProps = {
  onClick: station => console.log(station),
};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, undefined),
  withRouter,
  withNotification,
)(SwitcherItem);
