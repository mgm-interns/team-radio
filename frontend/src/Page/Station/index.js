import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import AddLink from './AddLink';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';
import { StationSwitcher, NavBar, Footer } from '../../Component';
import fixture from '../../Fixture/landing';
import styles from './styles';
import { joinStation } from '../../Redux/api/currentStation/actions';

class StationPage extends Component {
  static propTypes = {
    classes: PropTypes.any,
    joinStation: PropTypes.any,
  };
  componentDidMount() {
    // Get station id from react-router
    const stationId = 'hthth';
    this.props.joinStation(stationId);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar />
        <Grid direction="row" container style={{ margin: 0, width: '100%' }}>
          <Grid item xs={12} className={classes.switcherContainer}>
            <StationSwitcher />
          </Grid>
          <Grid item xs={12} className={classes.container}>
            <Grid container>
              <Grid item xs={12} md={8} lg={9}>
                <Grid container>
                  <Grid item xs={12}>
                    <h1>MY STATION</h1>
                  </Grid>
                  <NowPlaying className={classes.content} />
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <h1>NOW PLAYING</h1>
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

const mapDispatchToProps = dispatch => ({
  joinStation: stationId => dispatch(joinStation(stationId)),
});

export default compose(
  withStyles(styles),
  connect(undefined, mapDispatchToProps),
)(StationPage);
