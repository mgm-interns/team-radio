'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = error => {
  const data = (0, _graphql.formatError)(error);
  const { originalError } = error;
  data.field = originalError && originalError.field;
  return data;
};