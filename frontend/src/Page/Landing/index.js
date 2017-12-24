import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';

import { NavBar } from '../../Component';

import Backdrop from './Backdrop';
import PopularStation from './PopularStation';
import Section from './Section';
import ImageTextLayout from './ImageTextLayout';

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
      <div>
        <NavBar />
        <Backdrop />
        <ImageTextLayout />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentStation: state.api.currentStation,
});

export default compose(connect(mapStateToProps), withRouter)(Landing);
