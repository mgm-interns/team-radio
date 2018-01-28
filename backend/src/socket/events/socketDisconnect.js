/** *******************************************************
 *                                                        *
 *                                                        *
 *                    SOCKET DISCONNECT                   *
 *                        By Ryker                        *
 *                                                        *
 *                                                        *
 ******************************************************** */

import * as onlineManager from '../managers/onlineUserManager';

export default socket => {
  onlineManager.leaveAllStation(socket, socket.userId);
};
