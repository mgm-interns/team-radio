import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { StationList } from 'Component';
import {
  getStationsByUserId,
  getRecentStationsByUserId,
} from 'Redux/api/userProfile/stations';
import { joinStation } from 'Redux/api/currentStation/actions';
import { setPreviewVideo } from 'Redux/page/station/actions';
import { withRouter } from 'react-router-dom';
import { withNotification } from 'Component/Notification';
import styles from './styles';

class FilterAll extends Component {
  constructor(props) {
    super(props);

    this._goToStationPage = this._goToStationPage.bind(this);
  }
  componentDidMount() {
    const { user: { userId } } = this.props;
    this.props.requestStationsByUserId(userId);
    this.props.requestRecentStationsByUserId(userId);
  }

  _goToStationPage(station) {
    const {
      history,
      joinStationRequest,
      notification,
      user: { userId },
    } = this.props;

    // redirect to station page
    history.push(`/station/${station.station_id}`);
    joinStationRequest({ userId, stationId: station.station_id });
    setPreviewVideo();
    // Scroll to left after switch successful
    // this.scrollbarRef.scrollLeft();
    // }
    notification.app.success({
      message: `Switched to station ${station.station_name}`,
    });
  }

  render() {
    const { classes, all, recent } = this.props;

    return (
      <Grid container className={classes.containerWrapper}>
        <Grid item xs={12} className={classes.container}>
          <Typography type="title">My stations</Typography>
          <div className={classes.stationSection}>
            <StationList
              stations={all.data.stations}
              loading={all.loading}
              emptyMessage={'You have no station.'}
              onItemClick={this._goToStationPage}
              disableOnlineCount
            />
          </div>
          <Typography type="title" className={classes.titleLabel}>
            Recent
          </Typography>
          <div className={classes.stationsSection}>
            <StationList
              stations={recent.data.stations}
              loading={recent.loading}
              emptyMessage={"You haven't interact with any station yet."}
              onItemClick={this._goToStationPage}
              disableOnlineCount
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

FilterAll.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  redirectToStationPageRequest: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
  requestStationsByUserId: PropTypes.func,
  requestRecentStationsByUserId: PropTypes.func,
  all: PropTypes.any,
  recent: PropTypes.any,
  match: PropTypes.object,
  notification: PropTypes.object,
  setPreviewVideo: PropTypes.func,
  joinStationRequest: PropTypes.func,
};

const mapStateToProps = ({ api }) => ({
  all: api.userStations.all,
  recent: api.userStations.recent,
});

const mapDispatchToProps = dispatch => ({
  requestStationsByUserId: userId => dispatch(getStationsByUserId(userId)),
  requestRecentStationsByUserId: userId =>
    dispatch(getRecentStationsByUserId(userId)),
  joinStationRequest: option => dispatch(joinStation(option)),
  setPreviewVideo: () => dispatch(setPreviewVideo()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withNotification,
)(FilterAll);
