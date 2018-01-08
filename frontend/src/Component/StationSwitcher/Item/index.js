import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from 'material-ui/Tooltip';
import { transformText } from 'Transformer';
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
  componentDidMount() {
    // const { muteNowPlaying, mutePreview } = this.props;
    // muteNowPlaying();
    // mutePreview();
  }

  render() {
    const {
      goToStationPage,
      classes,
      isActive,
      station_name,
      id,
      currentStation: { station, playlist, nowPlaying },
    } = this.props;
    let { avatar } = this.props;
    if ((station && station.id) === id) {
      const currentSong = playlist.filter(
        ({ url }) => url === nowPlaying.url,
      )[0];
      avatar = (currentSong && currentSong.thumbnail) || avatar;
    }
    return (
      <div
        className={classNames(classes.stationWrapper, {
          [classes.activeStation]: isActive,
        })}
        onClick={goToStationPage}
      >
        <img src={avatar} className={classes.stationAvatar} />
        <div className={classes.stationInfo}>
          <Tooltip id={id} title={station_name} placement={'right'}>
            <span className={classes.stationTitle}>
              {transformText.reduceByCharacters(station_name, 10)}
            </span>
          </Tooltip>
        </div>
      </div>
    );
  }
}

SwitcherItem.propTypes = {
  goToStationPage: PropTypes.any,
  classes: PropTypes.any,
  avatar: PropTypes.any,
  isActive: PropTypes.any,
  station_name: PropTypes.any,
  currentStation: PropTypes.object,
  id: PropTypes.any,
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
