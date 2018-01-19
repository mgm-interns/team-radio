import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';

import { NavBar, Footer } from 'Component';
import { withNotification } from 'Component/Notification';

import Backdrop from './Backdrop';
import Cover from './Cover';
import Content from './Content';
import Stations from './Stations';

class Landing extends Component {
  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { currentStation: { station } } = nextProps;

    const currentStationId =
      this.props.currentStation.station &&
      this.props.currentStation.station.station_id;

    const nextStationId = station && station.station_id;
    if (nextStationId && currentStationId !== nextStationId) {
      history.replace(`/station/${nextStationId}`);
    }
  }

  render() {
    return [
      <NavBar key={1} />,
      <Backdrop key={2} />,
      <Stations key={3} />,
      <Cover key={4} />,
      <Content key={5} />,
      <Footer key={6} />,
    ];
  }
}

Landing.propTypes = {
  notification: PropTypes.object,
  currentStation: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation,
});

export default compose(connect(mapStateToProps), withRouter, withNotification)(
  Landing,
);
