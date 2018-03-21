import React from 'react';

/**
 * This component will detect if the current domain
 * is the production environment which is running on heroku or not
 * If it is, the page will be redirected to main domain
 *
 * This component can be removed in the future.
 */
class RadioRedirector extends React.Component {
  static isProductionHerokuDomain(hostname) {
    return !!hostname.match(/teamradio.herokuapp.com/);
  }

  render() {
    if (
      typeof window !== 'undefined' &&
      RadioRedirector.isProductionHerokuDomain(window.location.hostname)
    ) {
      window.location.replace('https://www.teamrad.io');
    }

    return null;
  }
}

RadioRedirector.propTypes = {};

export default RadioRedirector;
