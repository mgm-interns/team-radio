import jwt from 'jsonwebtoken';
import pubsub from '../../pubsub';

/**
 * Resolver
 */
export default {
  User: {},
  Subscription: {
    Me: {
      subscribe: () => pubsub.asyncIterator('Me'),
    },
  },
  Query: {
    getAllUsers: async (root, data, { models: { User }, ValidationError }) => {
      try {
        const users = await User.query();
        return users;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getUserByID: async (
      root,
      { userId },
      { models: { User }, ValidationError },
    ) => {
      try {
        const user = await User.query().findById(userId);
        if (!user) {
          throw new ValidationError('user-not-found');
        }
        return user;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'user-not-found') {
          throw new ValidationError('user-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    me: (root, data, { ValidationError, user }) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      return user;
    },
  },
  Mutation: {
    register: async (
      root,
      data,
      { models: { User }, ValidationError, user },
    ) => {
      if (user) {
        throw new ValidationError('still-logging-in');
      }
      Object.assign(data, data, {
        gender: 'unknown',
      });
      try {
        const newUser = await User.query().insert(data);
        return newUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.code === '23505') {
          throw new ValidationError('email-existed', 'email');
        }
        throw new ValidationError('bad-request');
      }
    },
    login: async (
      root,
      { email, password },
      { models: { User }, ValidationError, user, config },
    ) => {
      if (user) {
        throw new ValidationError('still-logging-in');
      }

      const authUser = await User.query().findOne({ email });
      if (!authUser) {
        throw new ValidationError('user-not-exists');
      }
      const isPasswordMatch = await authUser.checkPassword(password);
      if (!isPasswordMatch) {
        throw new ValidationError('wrong-email-or-password');
      }

      const tokenPayload = {
        id: authUser.id,
        versionKey: authUser.version_key,
      };
      const token = jwt.sign(tokenPayload, config.jwtSecret, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign(tokenPayload, config.jwtRefreshSecret, {
        expiresIn: '7d',
      });
      return {
        token,
        refreshToken,
      };
    },
    updateMe: async (root, data, { ValidationError, user }) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const updatedUser = await user
          .$query()
          .findById(user.id)
          .patchAndFetch(data);

        pubsub.publish('Me', {
          Me: updatedUser,
        });

        return updatedUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updatePassword: async (
      root,
      { oldPassword, newPassword },
      { ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      const oldPasswordMatch = await user.checkPassword(oldPassword);
      if (!oldPasswordMatch) {
        throw new ValidationError('wrong-password');
      }

      const newPasswordSameOldPassword = await user.checkPassword(newPassword);
      if (newPasswordSameOldPassword) {
        throw new ValidationError('input-old-password');
      }
      try {
        const updatedUser = await user
          .$query()
          .patchAndFetch({ password: newPassword });
        return updatedUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request', 'password');
      }
    },
    deleteUser: async (root, { id }, { models: { User }, ValidationError }) => {
      try {
        const user = await User.query().findById(id);

        if (!user) throw new ValidationError('User not exist');

        await user.deleteAllRelationship();

        // delete user
        await User.query().deleteById(id);

        return user;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
