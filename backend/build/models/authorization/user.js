'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _objection = require('objection');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _common = require('../../utils/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const unique = require('objection-unique')({
  fields: ['email'],
  identifiers: ['id']
});

class User extends unique(_objection.Model) {
  // eslint-disable-next-line class-methods-use-this
  $beforeValidate(jsonSchema, json) {
    const newJson = _extends({}, json);
    if (json.dob) {
      newJson.dob = json.dob.toUTCString();
    }
    return newJson;
  }
  $beforeInsert() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.created_at = new Date();
      _this.updated_at = new Date();

      _this.password = yield _bcryptjs2.default.hash(_this.password, _config2.default.saltFactor);
      _this.version_key = yield _bcryptjs2.default.hash(_common2.default.randomStr(), _config2.default.saltFactor);
    })();
  }
  $beforeUpdate() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.updated_at = new Date();
      if (_this2.password) {
        _this2.password = yield _bcryptjs2.default.hash(_this2.password, _config2.default.saltFactor);
        _this2.version_key = yield _bcryptjs2.default.hash(_common2.default.randomStr(), _config2.default.saltFactor);
      }
    })();
  }
  checkPassword(password) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const passwordMatch = yield _bcryptjs2.default.compare(password, _this3.password);
      return passwordMatch;
    })();
  }
  hashPassword() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      _this4.password = yield _bcryptjs2.default.hash(_this4.password, _config2.default.saltFactor);
    })();
  }
}
exports.default = User;
User.tableName = 'users';
User.jsonSchema = {
  type: 'object',
  required: ['firstname', 'lastname', 'email', 'password', 'gender'],
  properties: {
    id: { type: 'number' },
    firstname: { type: 'string', maxLength: '100' },
    lastname: { type: 'string', maxLength: '255' },
    email: {
      type: 'string',
      format: 'email',
      minLength: '5',
      maxLength: '100'
    },
    password: { type: 'string', pattern: _common2.default.passwordRegex.source },
    gender: {
      type: 'string',
      enum: ['male', 'female', 'unknown'],
      default: 'unknown'
    },
    dob: { type: 'string' },
    phone_number: {
      type: ['string', 'null'],
      maxLength: '12'
    },

    version_key: { type: 'string' }
  }
};