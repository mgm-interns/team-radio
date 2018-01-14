import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter, Route } from 'react-router-dom';
import { withScrollbarInstances } from 'Component/Scrollbar';

class RouteWrapper extends Component {
  componentDidMount() {
    const { history, scrollbarInstances } = this.props;
    this.unlisten = history.listen(() => {
      scrollbarInstances.getInstance('App').scrollYTo(0);
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
  history: PropTypes.any,
  scrollbarInstances: PropTypes.object,
  path: PropTypes.string,
  routes: PropTypes.array,
};

export default compose(withRouter, withScrollbarInstances)(RouteWrapper);
