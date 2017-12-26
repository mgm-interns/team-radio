import Images from 'Theme/Images';
import { capitalizeFirstLetter } from 'material-ui/utils/helpers';
import { NOTIFICATION_DURATION, LEVELS } from '.';

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
    /**
     * Apply notification levels:
     * - info
     * - success
     * - warning
     * - error
     */
    /* eslint-disable array-callback-return */
    Object.keys(LEVELS).map(key => {
      const level = LEVELS[key];
      const title = capitalizeFirstLetter(`${level} !`);
      this[level] = notification => this.notify({ title, ...notification });
    });
  }

  notify({ title, message, duration, ...others } = {}) {
    // Ignore when permission is not GRANTED
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

export default BrowserNotification;
