import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddLink from './AddLink';

class StationPage extends Component {
  render() {
    return (
      <div>
        <h1>Station Page</h1>
        <AddLink />
      </div>
    );
  }
}

StationPage.propTypes = {};

export default StationPage;
