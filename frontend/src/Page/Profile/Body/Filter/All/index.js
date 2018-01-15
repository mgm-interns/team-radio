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
} from 'Redux/api/user/stations';
import styles from './styles';

class FilterAll extends Component {
  componentDidMount() {
    this.props.requestStationsByUserId(localStorage.getItem('userId'));
    this.props.requestRecentStationsByUserId(localStorage.getItem('userId'));
  }

  render() {
    const { classes, all, recent } = this.props;
    return (
      <Grid container className={classes.containerWrapper}>
        <Grid item xs={12} className={classes.container}>
          <Typography type="display1" className={classes.titleLabel}>
            My Stations
          </Typography>
          <div className={classes.stationsSection}>
            <StationList
              stations={all.data.stations}
              loading={all.loading}
              emptyMessage={'You have no station.'}
              disableOnlineCount
            />
          </div>
          <Typography type="display1" className={classes.titleLabel}>
            Interactive Stations
          </Typography>
          <div className={classes.stationsSection}>
            <StationList
              stations={recent.data.stations}
              loading={recent.loading}
              emptyMessage={"You haven't interact with any station yet."}
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
};

const mapStateToProps = ({ api }) => ({
  all: api.userStations.all,
  recent: api.userStations.recent,
});

const mapDispatchToProps = dispatch => ({
  requestStationsByUserId: userId => dispatch(getStationsByUserId(userId)),
  requestRecentStationsByUserId: userId =>
    dispatch(getRecentStationsByUserId(userId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(FilterAll);
