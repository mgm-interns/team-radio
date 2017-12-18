import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './stypes.css';

class AddLink extends Component {
  render() {
    return (
      <div>
        <h3>ADD TO STATION 1</h3>
        <div>
          <div>
            <input type="text" placeholder="Add your link..." />
          </div>
        </div>
      </div>
    );
  }
}

AddLink.propTypes = {};

export default AddLink;
