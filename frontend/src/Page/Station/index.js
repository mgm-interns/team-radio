import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import { StationSwitcher, NavBar, Footer } from 'Component';
import { joinStation } from 'Redux/api/currentStation/actions';
import AddLink from './AddLink';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';
import styles from './styles';

const STATION_NAME_DEFAULT = 'Station Name';
const JOIN_STATION_DELAY = 2000; // 2 seconds

class StationPage extends Component {
  static propTypes = {
    classes: PropTypes.any,
    joinStation: PropTypes.any,
    currentStation: PropTypes.object,
  };

  joinStationInterval = null;

  componentWillMount() {
    // Get station id from react-router
    const { match: { params: { stationId } }, history } = this.props;
    if (stationId) {
      this.props.joinStation(stationId);
      this.joinStationInterval = setInterval(() => {
        this.props.joinStation(stationId);
      }, JOIN_STATION_DELAY);
    } else {
      history.replace(`/`);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      (nextProps.currentStation && nextProps.currentStation.id) !==
      (this.props.currentStation && this.props.currentStation.id)
    ) {
      clearInterval(this.joinStationInterval);
    }
  }

  render() {
    const { classes, currentStation } = this.props;
    return [
      <NavBar key={1} color="primary" />,
      <Grid
        key={2}
        direction="row"
        container
        className={classes.containerWrapper}
      >
        <Grid item xs={12} className={classes.switcherContainer}>
          <StationSwitcher />
        </Grid>
        <Grid item xs={12} className={classes.container}>
          <Grid container>
            <Grid item xs={12} md={7} xl={8}>
              <Grid container>
                <Grid item xs={12}>
                  <h1>
                    {currentStation
                      ? currentStation.station_name
                      : STATION_NAME_DEFAULT}
                  </h1>
                </Grid>
                <NowPlaying
                  className={`${classes.content} ${classes.nowPlaying}`}
                  autoPlay={true}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={5} xl={4}>
              <Grid container>
                <Grid item xs={12}>
                  <h1>Now Playing</h1>
                </Grid>
                <Playlist className={classes.content} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AddLink />
            </Grid>
          </Grid>
        </Grid>
      </Grid>,
      <Footer key={3} />,
    ];
  }
}

StationPage.propTypes = {
  classes: PropTypes.any,
  joinStation: PropTypes.any,
  match: PropTypes.any,
  history: PropTypes.any,
  currentStation: PropTypes.any,
};

const mapStateToProps = state => ({
  currentStation: state.api.currentStation.station,
});

const mapDispatchToProps = dispatch => ({
  joinStation: stationId => dispatch(joinStation(stationId)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(StationPage);
