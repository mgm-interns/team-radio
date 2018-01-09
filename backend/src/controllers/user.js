/* eslint-disable */
import userModels from '../models/user';
import jwt from 'jsonwebtoken';

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
            throw new Error('User ID is not exist!');
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
            throw new Error('User ID is not exist!');
        }
    } catch (err) {
        throw err;
    }
};

export const createUserWithSocialAccount = async (email, googleId = null, facebookId = null) => {
    try {
        let user = await userModels.getUserByEmail(email);
        if (user) {
            if (googleId)
                await userModels.setGoogleId(email, googleId)
            if (facebookId)
                await userModels.setFacebookId(email, facebookId)
        } else {
            let user = await new userModels({
                email : email,
                google_id : googleId,
                facebook_id : facebookId,
            });
            await user.save();
            await userModels.setName(email, user._id.toString());
        }
        user = await userModels.getUserByEmail(email);
        return user;
    } catch (err) {
        throw err;
    }
};
