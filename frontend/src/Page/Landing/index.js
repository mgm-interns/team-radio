import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';

import NavBar from '../../Component/NavBar';
import Footer from '../../Component/Footer';

import Backdrop from './Backdrop';
import PopularStation from './PopularStation';
import Section from './Section';

class Landing extends Component {
  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const currentStationId =
      this.props.currentStation.station &&
      this.props.currentStation.station._id;
    const nextStationId =
      nextProps.currentStation.station && nextProps.currentStation.station._id;
    if (currentStationId !== nextStationId) {
      const { stationName } = nextProps.currentStation.station;
      history.push(`/station/${stationName}`);
    }
  }

  render() {
    return (
      <Grid container xs={12} style={{ margin: 0, padding: 0 }}>
        <NavBar />
        <Backdrop />
        <PopularStation />
        <Section />
        <Footer />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentStation: state.api.currentStation,
});

export default compose(connect(mapStateToProps), withRouter)(Landing);
