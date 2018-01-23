// import library
import nodeMailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import jwt from 'jsonwebtoken';
import path from 'path';

// import models
import User from '../models/user';

const email = process.env.MAILER_EMAIL;
const pass = process.env.MAILER_PASS;
const resetPasswordUrl =
  process.env.RESET_PASSWORD_URL || 'http://localhost:3000/auth/resetpassword/';
const smtpTransport = nodeMailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass,
  },
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('../backend/src/templates'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));
/**
 * @param email
 * @returns {Promise<void>}
 */
export const forgotPassword = async (emailAdd, superSecret) => {
  try {
    const user = await User.getUserByEmail(emailAdd);
    if (!user)
      return {
        Error: true,
        message: 'Email not found!',
      };
    const payload = {
      email: emailAdd,
    };

    const token = jwt.sign(payload, superSecret, { expiresIn: 86400 });
    await User.setTokenResetPassword(user._id.toString(), token);

    const data = {
      to: user.email,
      from: email,
      template: 'forgot-password-email',
      subject: 'Reset TeamRadio password',
      context: {
        reset_password_url: resetPasswordUrl + token,
        name: user.name,
      },
    };
    await smtpTransport.sendMail(data);

    return {
      error: false,
      message: 'Success! Check your email to reset your password',
    };
  } catch (err) {
    throw err;
  }
};

export const verifyResetPasswordToken = async (token, superSecret) => {
  try {
    const user = await User.getUserByResetToken(token);
    if (!user) {
      return {
        Error: true,
        message: 'Your reset password link is wrong!',
      };
    }
    if (token === user.token_reset_password) {
      const decoded = jwt.verify(token, superSecret);
      if (decoded)
        return {
          Error: false,
          message: 'Enter new password!',
        };
    }
    return {
      Error: true,
      message: 'Your reset password link is wrong!',
    };
  } catch (err) {
    return {
      Error: true,
      message: 'Your reset password link is wrong!',
    };
  }
};
/**
 * @param token
 * @param email
 * @param secretKey
 * @param oldPassword
 * @param newPassword
 * @returns {Promise<void>}
 */
export const resetPassword = async (token, superSecret, newPassword) => {
  try {
    const user = await User.getUserByResetToken(token);
    if (!user)
      return {
        Error: true,
        message: 'Your reset password link is wrong!',
      };
    if (token === user.token_reset_password) {
      const decoded = jwt.verify(token, superSecret);
      if (decoded) {
        console.log(newPassword);
        const password = user.generateHash(newPassword);
        await User.setPassword(user.email, password);

        // send email
        const data = {
          to: user.email,
          from: email,
          template: 'reset-password-email',
          subject: 'Reset TeamRadio password successfully',
          context: {
            name: user.name,
          },
        };
        await smtpTransport.sendMail(data);
        return {
          Error: false,
          message: 'Your password has been changed successfully!',
        };
      }
    }
    return {
      Error: true,
      message: 'Your reset password link is out of date!',
    };
  } catch (err) {
    throw err;
  }
};
