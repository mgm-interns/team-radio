/** *******************************************************
 *                                                        *
 *                                                        *
 *                     LEAVE STATION                      *
 *                        By Ryker                        *
 *                                                        *
 *                                                        *
 ******************************************************** */

import * as onlineManager from '../managers/onlineUserManager';

export default async (socket, userId) => {
  onlineManager.leaveAllStation(socket, userId);
};
