import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { NavBar, Footer, withNotification } from 'Component';

import Backdrop from './Backdrop';
import SectionCover from './SectionCover';
import SectionContent from './SectionContent';

class Landing extends Component {
  // componentWillReceiveProps(nextProps) {
  //   const { history } = this.props;
  //   const currentStationId =
  //     this.props.currentStation.station &&
  //     this.props.currentStation.station._id;
  //   const nextStationId =
  //     nextProps.currentStation.station && nextProps.currentStation.station._id;
  //   if (currentStationId !== nextStationId) {
  //     const { station_name } = nextProps.currentStation.station;
  //     history.push(`/station/${station_name}`);
  //   }
  // }

  componentDidMount() {
    const { notification: { app, browser } } = this.props;
    let count = 0;
    const duration = 2000;
    // Call notification 3 times
    const interval = setInterval(async () => {
      await app.success({
        message: 'Authentication is fucking failed!',
        duration,
      });
      await browser.info({
        message: 'Authentication is fucking failed!',
        duration,
      });
      count += 1;
      if (count > 3) {
        clearInterval(interval);
      }
    }, 300);
  }

  render() {
    return (
      <div>
        <NavBar />
        <Backdrop />
        <SectionCover />
        <SectionContent />
        <Footer />
      </div>
    );
  }
}

Landing.propTypes = {
  notification: PropTypes.object,
  currentStation: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  currentStation: state.api.currentStation,
});

export default compose(connect(mapStateToProps), withRouter, withNotification)(
  Landing,
);
