import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import AddLink from './AddLink';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';
import { StationSwitcher, NavBar, Footer } from '../../Component';
// import fixture from '../../Fixture/landing';
import styles from './styles';
import { joinStation } from '../../Redux/api/currentStation/actions';

class StationPage extends Component {
  static propTypes = {
    classes: PropTypes.any,
    joinStation: PropTypes.any,
  };
  componentWillMount() {
    // Get station id from react-router
    const { match: { params: { stationName } }, history } = this.props;
    console.log(this.props.match.params.stationName);
    if (stationName) {
      this.props.joinStation(stationName);
    } else {
      console.log('go to landing page');
      history.push(`/`);
    }
  }

  render() {
    const { classes, currentStation: { station } } = this.props;
    return (
      <div>
        <NavBar color="primary" />
        <Grid direction="row" container>
          <Grid item xs={12} className={classes.switcherContainer}>
            <StationSwitcher />
          </Grid>
          <Grid item xs={12} className={classes.container}>
            <Grid container>
              <Grid item xs={12} md={7} xl={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <h1>{station && station.stationName}</h1>
                  </Grid>
                  <NowPlaying className={classes.content} />
                </Grid>
              </Grid>
              <Grid item xs={12} md={5} xl={4}>
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
