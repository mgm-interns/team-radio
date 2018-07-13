import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRImage from 'qr-image';

class QRCode extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  render() {
    var pngBuffer = QRImage.imageSync(this.props.text, {
      type: 'png',
      margin: 1,
    });
    var dataURI = 'data:image/png;base64,' + pngBuffer.toString('base64');
    return React.createElement('img', { className: 'qr-code', src: dataURI });
  }
}

export default QRCode;
