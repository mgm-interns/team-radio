import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scrollbarInstances } from 'Configuration';
import OriginScrollbar from 'react-scrollbar';
import './override.css';

class Scrollbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disable: false,
    };

    this.disableScrolling = this.disableScrolling.bind(this);
    this.enableScrolling = this.enableScrolling.bind(this);
  }

  disableScrolling() {
    this.setState({
      disable: true,
    });
  }

  enableScrolling() {
    this.setState({
      disable: false,
    });
  }

  componentDidMount() {
    const { level } = this.props;

    scrollbarInstances.pushInstance(level, {
      __proto__: this.scrollbarRef,
      disable: this.disableScrolling,
      enable: this.enableScrolling,
    });
  }

  componentWillMount() {
    const { level } = this.props;
    scrollbarInstances.removeInstance(level);
  }

  render() {
    const { level, speed, children, ...others } = this.props;
    return (
      <OriginScrollbar
        {...others}
        stopScrollPropagation={true}
        speed={this.state.disable ? 0 : speed}
        ref={ref => {
          this.scrollbarRef = ref;
        }}
      >
        {children}
      </OriginScrollbar>
    );
  }
}

Scrollbar.propTypes = {
  ...OriginScrollbar.propTypes,
  level: PropTypes.string,
};

Scrollbar.defaultProps = {
  speed: 1,
};

export const withScrollbarInstances = ChildComponent =>
  class extends Component {
    render() {
      return (
        <ChildComponent
          {...this.props}
          scrollbarInstances={scrollbarInstances}
        />
      );
    }
  };

export default Scrollbar;
