import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import {
  getStationsByUserId,
  getRecentStationsByUserId,
} from 'Redux/api/visitor';
import { joinStation } from 'Redux/api/currentStation/actions';
import { setPreviewVideo } from 'Redux/page/station/actions';

import { StationList } from 'Component';
import { withNotification } from 'Component/Notification';

import styles from './styles';

class FilterAll extends Component {
  constructor(props) {
    super(props);

    this._goToStationPage = this._goToStationPage.bind(this);
    this._renderStationList = this._renderStationList.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    this.props.getStationsByUserId(userId);
    this.props.getRecentStationByUserId(userId);
  }

  _goToStationPage(station) {
    const { history, joinStationRequest, notification, userId } = this.props;

    // redirect to station page
    history.push(`/station/${station.station_id}`);

    joinStationRequest({ userId, stationId: station.station_id });
    notification.app.success({
      message: `Switched to station ${station.station_name}`,
    });
  }

  _renderStationList(title, data, loading, emptyMessage) {
    const { classes } = this.props;
    return [
      <Typography key={1} type="title">
        {title}
      </Typography>,
      <div key={2} className={classes.stationSection}>
        <StationList
          stations={data}
          loading={loading}
          emptyMessage={emptyMessage}
          onItemClick={this._goToStationPage}
          disableOnlineCount
        />
      </div>,
    ];
  }

  render() {
    const { classes, all, recent, isDisabled, name } = this.props;
    const stationsTitle = isDisabled ? 'My stations' : `${name}'s stations`;

    return (
      <Grid container className={classes.containerWrapper}>
        <Grid item xs={12} className={classes.container}>
          {this._renderStationList(
            stationsTitle,
            all.data.stations,
            all.loading,
            'You have no station',
          )}
          {this._renderStationList(
            'Recent',
            recent.data.stations,
            recent.loading,
            "You haven't interact with any station yet",
          )}
        </Grid>
      </Grid>
    );
  }
}

FilterAll.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
  getStationsByUserId: PropTypes.func,
  getRecentStationByUserId: PropTypes.func,
  all: PropTypes.any,
  recent: PropTypes.any,
  match: PropTypes.object,
  notification: PropTypes.object,
  setPreviewVideo: PropTypes.func,
  joinStationRequest: PropTypes.func,
  userId: PropTypes.any,
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
};

const mapStateToProps = ({ api }) => ({
  all: api.visitor.all,
  recent: api.visitor.recent,
});

const mapDispatchToProps = dispatch => ({
  getStationsByUserId: userId => dispatch(getStationsByUserId(userId)),
  getRecentStationByUserId: userId =>
    dispatch(getRecentStationsByUserId(userId)),
  joinStationRequest: option => dispatch(joinStation(option)),
  setPreviewVideo: () => dispatch(setPreviewVideo()),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
  withNotification,
)(FilterAll);
