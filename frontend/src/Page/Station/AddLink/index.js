import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'material-ui';
import './stypes.css';

class AddLink extends Component {
  render() {
    return (
      <div className="add-link-container">
        <h3>ADD TO STATION 1</h3>
        <div className="add-link-box">
          <div className="add-link-box-left">
            <Input
              type="text"
              placeholder="Add your link..."
              autoFocus
              disableUnderline
            />
          </div>
        </div>
      </div>
    );
  }
}

AddLink.propTypes = {};

export default AddLink;
