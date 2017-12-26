import React, { Component } from 'react';
// import PropTypes from 'prop-types';
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

class StationPage extends Component {
  static propTypes = {
    classes: PropTypes.any,
    joinStation: PropTypes.any,
  };
  componentWillMount() {
    // Get station id from react-router
    const { match: { params: { station_name } }, history } = this.props;
    if (station_name) {
      this.props.joinStation(station_name);
    } else {
      history.push(`/`);
    }
  }

  render() {
    const { classes, currentStation: { station } } = this.props;
    return (
      <div>
        <NavBar color="primary" />
        <Grid direction="row" container className={classes.containerWrapper}>
          <Grid item xs={12} className={classes.switcherContainer}>
            <StationSwitcher />
          </Grid>
          <Grid item xs={12} className={classes.container}>
            <Grid container>
              <Grid item xs={12} md={7} xl={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <h1>{station && station.station_name}</h1>
                  </Grid>
                  <NowPlaying className={classes.content} autoplay={true} />
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
        </Grid>
        <Footer />
      </div>
    );
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
  currentStation: state.api.currentStation,
});

const mapDispatchToProps = dispatch => ({
  joinStation: stationId => dispatch(joinStation(stationId)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(StationPage);
