import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';

/* eslint-disable react/prop-types */
class RouteWrapper extends Component {
  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.props.scrollbarRef.scrollTop(0);
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

RouteWrapper.propTypes = {};

export default withRouter(RouteWrapper);
