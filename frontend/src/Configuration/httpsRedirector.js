import React from 'react';
import PropTypes from 'prop-types';
import { HOST_NAME } from 'Util/constants';

class HttpsRedirector extends React.Component {
  isLocalHost(hostname) {
    return !!(
      hostname === 'localhost' ||
      hostname === '[::1]' ||
      hostname.match(HOST_NAME)
    );
  }

  render() {
    if (
      typeof window !== 'undefined' &&
      window.location &&
      window.location.protocol === 'http:' &&
      !this.isLocalHost(window.location.hostname)
    ) {
      window.location.href = window.location.href.replace(
        /^http(?!s)/,
        'https',
      );
    }

    return <div>{this.props.children}</div>;
  }
}

HttpsRedirector.propTypes = {
  children: PropTypes.node,
};

export default HttpsRedirector;
