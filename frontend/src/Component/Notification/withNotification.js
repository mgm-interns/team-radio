import React, { Component } from 'react';
import Notification from '.';

/**
 * HOC to pass a notification prop to its child
 * @param ChildComponent
 *
 * Available function in notification:
 * - add
 * - remove
 * - edit
 * - clear
 * - info
 * - success
 * - warning
 * - error
 */
export default ChildComponent =>
  class extends Component {
    render() {
      return <ChildComponent notification={Notification.instance} />;
    }
  };
