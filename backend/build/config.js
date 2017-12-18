'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

exports.default = {
  env: process && process.env && process.env.NODE_ENV || 'development',
  port: process && process.env && process.env.PORT || '8080',
  wsPort: process && process.env && process.env.WS_PORT || '65080',
  saltFactor: parseInt(process && process.env && process.env.SALT_FACTOR || '12', 10),
  jwtSecret: process && process.env && process.env.JWT_SECRET || 'aksdjqopwieopqiw;dalskdl;askdas',
  jwtRefreshSecret: process && process.env && process.env.JWT_REFRESH_SECRET || 'alksdjoiouqwedASDASDA1231232',
  jwtForgotPasswordSecret: process && process.env && process.env.JWT_FORGOT_PASSWORD_SECRET || 'ASD!@#JASZXCM!#@#JFAS12388asdlkj'
};