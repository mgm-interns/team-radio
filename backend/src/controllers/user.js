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

export const createUserWithSocialAccount = async (email, googleId = null, facebookId = null, avatar_url = null,name) => {
    try {
        let user = await userModels.getUserByEmail(email);
        if (user) {
            if (googleId)
                await userModels.setGoogleId(email, googleId);
            if (facebookId)
                await userModels.setFacebookId(email, facebookId);
            if (avatar_url)
                await userModels.setAvatarUrl(email, avatar_url);
        } else {
            let user = await new userModels({
                email : email,
                google_id : googleId,
                facebook_id : facebookId,
                name: name
            });
            await user.save();
            await userModels.setUsername(email, user._id.toString());
            if (avatar_url)
                await userModels.setAvatarUrl(email, avatar_url);
        }
        user = await userModels.getUserByEmail(email);
        return user;
    } catch (err) {
        throw err;
    }
};
export const createUser = async (email,password,name) => {
    try{
        let user = await new userModels({
            email : email,
            name: name,
        });

        user.password = user.generateHash(password)
        await user.save();
        await userModels.setUsername(email, user._id.toString());

        user = await userModels.getUserByEmail(email);
        return user;
    } catch(err) {
        throw err;
    }
}
export const getUserProfile = async (username) => {
    try{
        return await userModels.getUserByUsername(username);
    } catch (err) {
        throw err
    }
}
export const setAvatar = async (userId, avatar_url) => {
    try{
        await userModels.setAvatar(userId, avatar_url);
        return await userModels.getUserById(userId);
    }catch(err){
        throw err;
    }
}