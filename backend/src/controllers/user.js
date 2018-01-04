/* eslint-disable */
import * as userModels from './../models/User';

export const isExistUserHandler = async email => {
  try {
    let alreadyUser = await userModels.getUserByEmail(email);

    //if email is already sign up
    if (alreadyUser) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};
export const getUserByEmail = async email => {
  try {
    let user = await userModels.getUserByEmail(email);

    //if email is already sign up
    if (user) {
      return user;
    } else {
      return 'User not found.';
    }
  } catch (err) {
    throw err;
  }
};

export const getUserById = async userId => {
    try {
        let user = await userModels.getUserById(userId);
        if (user) {
            return user;
        } else {
            return 'User not found.';
        }
    } catch (err) {
        throw err;
    }
};
