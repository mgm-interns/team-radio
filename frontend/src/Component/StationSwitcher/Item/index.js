import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import CircleOIcon from 'react-icons/lib/fa/circle-o';
import CircleIcon from 'react-icons/lib/fa/circle';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { muteNowPlaying, mutePreview } from 'Redux/page/station/actions';
import { withNotification } from 'Component/Notification';
import { withRouter } from 'react-router-dom';
import withStyles from 'material-ui/styles/withStyles';
import styles from '../styles';

/* eslint-disable camelcase */
/* eslint-disable no-shadow */
class SwitcherItem extends Component {
  render() {
    const {
      goToStationPage,
      classes,
      isActive,
      station_name,
      station_id,
      currentStation: { station, nowPlaying },
    } = this.props;
    let { thumbnail, online_count } = this.props;
    if ((station && station.station_id) === station_id) {
      thumbnail = (nowPlaying && nowPlaying.thumbnail) || thumbnail;
      online_count = this.props.currentStation.online_count; // eslint-disable-line
    }
    return (
      <div
        className={classNames(classes.stationWrapper, {
          [classes.activeStation]: isActive,
        })}
        onClick={goToStationPage}
      >
        <div
          className={classes.stationAvatar}
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
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
  goToStationPage: PropTypes.any,
  classes: PropTypes.any,
  thumbnail: PropTypes.any,
  isActive: PropTypes.any,
  station_name: PropTypes.any,
  currentStation: PropTypes.object,
  station_id: PropTypes.any,
  online_count: PropTypes.any,
  muteNowPlaying: PropTypes.func,
  mutePreview: PropTypes.func,
};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation,
});

const mapDispatchToProps = dispatch => ({
  muteNowPlaying: muted => dispatch(muteNowPlaying(muted)),
  mutePreview: muted => dispatch(mutePreview(muted)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withNotification,
)(SwitcherItem);
