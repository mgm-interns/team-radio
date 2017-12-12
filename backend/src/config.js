require('dotenv').config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  wsPort: process.env.WS_PORT,
  saltFactor: parseInt(process.env.SALT_FACTOR, 10),
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtForgotPasswordSecret: process.env.JWT_FORGOT_PASSWORD_SECRET,
  swEmail: process.env.SW_EMAIL_ADDRESS,
  mailstrap: {
    host: process.env.MT_HOST,
    port: process.env.MT_PORT,
    auth: {
      user: process.env.MT_USER,
      pass: process.env.MT_PASS,
    },
  },
};
