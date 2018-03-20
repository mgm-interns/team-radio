import React from 'react';

class RadioRedirector extends React.Component {
  static isHerokuDomain(hostname) {
    return !!hostname.match(/herokuapp/);
  }

  render() {
    if (
      typeof window !== 'undefined' &&
      RadioRedirector.isHerokuDomain(window.location.hostname)
    ) {
      window.location.replace('https://www.teamrad.io');
    }

    return null;
  }
}

RadioRedirector.propTypes = {};

export default RadioRedirector;
