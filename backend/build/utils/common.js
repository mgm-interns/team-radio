'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const randomStr = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const passwordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})');

const commonUtils = {
  randomStr,
  passwordRegex
};

exports.default = commonUtils;