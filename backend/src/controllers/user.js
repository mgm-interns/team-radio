/* eslint-disable */
import userModels from '../models/user';

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
      throw 'User not found.';
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
            throw 'User not found.';
        }
    } catch (err) {
        throw err;
    }
};

export const createUserWithSocialAccount = async (email, googleId = null, facebookId = null, name) => {
    try {
        let user = await userModels.getUserByEmail(email);
        if (user) {
            await userModels.setSocialAccount(email, googleId, facebookId)
        } else {
            const user = await new userModels({
                email : email,
                google_ID : googleId,
                facebook_ID : facebookId,
                name : name,
            });
            // user.email = email;
            // user.google_ID = googleId;
            // user.facebook_ID = facebookId;
            // user.name = name;


            await user.save();
        }
        user = await userModels.getUserByEmail(email);
        return user;
    } catch (err) {
        throw err;
    }
};
