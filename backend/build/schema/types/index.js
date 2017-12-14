'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authorization = require('./authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _globalTypes = require('./globalTypes');

var _globalTypes2 = _interopRequireDefault(_globalTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// authorization
exports.default = [..._authorization2.default, _globalTypes2.default];

// globalTypes