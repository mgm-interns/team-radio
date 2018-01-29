import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter, Route } from 'react-router-dom';

class RouteWrapper extends Component {
  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <Route
        path={this.props.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <this.props.component {...props} routes={this.props.routes} />
        )}
      />
    );
  }
}

RouteWrapper.propTypes = {
  history: PropTypes.object,
  path: PropTypes.string,
  routes: PropTypes.array,
};

export default compose(withRouter)(RouteWrapper);
