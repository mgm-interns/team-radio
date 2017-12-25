import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';

import { NavBar, Footer } from 'Component';

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
      <div>
        <NavBar />
        <Backdrop />
      </div>
    );
  }
}

Landing.propTypes = {
  currentStation: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  currentStation: state.api.currentStation,
});

export default compose(connect(mapStateToProps), withRouter)(Landing);
