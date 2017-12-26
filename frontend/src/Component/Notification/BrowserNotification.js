import Images from 'Theme/Images';
import { NOTIFICATION_DURATION } from '.';

/* eslint-disable */
const PERMISSION_TYPE_DENIED = 'denied';
const PERMISSION_TYPE_DEFAULT = 'default';
const PERMISSION_TYPE_GRANTED = 'granted';
/* eslint-enable */

class BrowserNotification {
  constructor() {
    this.permission = Notification.permission;
    switch (this.permission) {
      case PERMISSION_TYPE_DENIED:
        break;
      case PERMISSION_TYPE_DEFAULT:
        Notification.requestPermission();
        break;
      default:
        break;
    }
  }

  notify({ title, message, duration, ...others } = {}) {
    if (this.permission === PERMISSION_TYPE_DENIED) {
      return undefined;
    }

    const notification = new Notification(title, {
      body: message,
      icon: Images.logo,
      ...others,
    });

    // Close notification when reach the end of duration
    setTimeout(() => {
      notification.close();
    }, duration || NOTIFICATION_DURATION);

    return notification;
  }
}

BrowserNotification.propTypes = {};

export default BrowserNotification;
