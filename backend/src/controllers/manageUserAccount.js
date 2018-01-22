// import library
import nodeMailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import jwt from 'jsonwebtoken';
import path from 'path';

// import models
import userModels from '../models/user';

const email = process.env.MAILER_EMAIL;
const pass = process.env.MAILER_PASS;
const resetPasswordUrl =
  process.env.RESET_PASSWORD_URL || 'https://localhost:8080/api/resetPassword/';
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
    const user = await userModels.getUserByEmail(emailAdd);
    if (!user) return { error: true, message: 'Email not found!' };

    const payload = {
      email: emailAdd,
    };

    const token = jwt.sign(payload, superSecret, { expiresIn: 300 });
    await userModels.setTokenResetPassword(user._id.toString(), token);

    const data = {
      to: user.email,
      from: email,
      template: 'forgot-password-email',
      subject: 'Reset password team radio',
      context: {
        url: resetPasswordUrl + token,
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
  const user = await userModels.getUserByResetToken(token);
  if (!user) return false;
  jwt.verify(token, superSecret, (err, decoded) => {
    if (err) return false;
    return true;
  });
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
    const user = await userModels.getUserByResetToken(token);
    if (user) return new Error('Token is not found');

    // check here
    const decoded = jwt.verify(token, superSecret);

    //
    if (
      decoded &&
      decoded.email === user.email &&
      user.token_reset_password === token
    ) {
      const password = userModels.generateHash(newPassword);
      await userModels.setPassword(user.email, password);
      return { message: 'Reset password successfully' };
    }
    return new Error('Token is not found or invalid');
  } catch (err) {
    throw err;
  }
};
