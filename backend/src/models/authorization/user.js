import bcrypt from 'bcryptjs';
import { Model } from 'objection';

import config from '../../config';
import commonUtils from '../../utils/common';

const unique = require('objection-unique')({
  fields: ['email'],
  identifiers: ['id'],
});

export default class User extends unique(Model) {
  static tableName = 'users';
  static jsonSchema = {
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
        maxLength: '100',
      },
      password: { type: 'string', pattern: commonUtils.passwordRegex.source },
      gender: {
        type: 'string',
        enum: ['male', 'female', 'unknown'],
        default: 'unknown',
      },
      dob: { type: 'string' },
      phone_number: {
        type: ['string', 'null'],
        maxLength: '12',
      },

      version_key: { type: 'string' },
    },
  };
  // eslint-disable-next-line class-methods-use-this
  $beforeValidate(jsonSchema, json) {
    const newJson = { ...json };
    if (json.dob) {
      newJson.dob = json.dob.toUTCString();
    }
    return newJson;
  }
  async $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();

    this.password = await bcrypt.hash(this.password, config.saltFactor);
    this.version_key = await bcrypt.hash(
      commonUtils.randomStr(),
      config.saltFactor,
    );
  }
  async $beforeUpdate() {
    this.updated_at = new Date();
    if (this.password) {
      this.password = await bcrypt.hash(this.password, config.saltFactor);
      this.version_key = await bcrypt.hash(
        commonUtils.randomStr(),
        config.saltFactor,
      );
    }
  }
  async checkPassword(password) {
    const passwordMatch = await bcrypt.compare(password, this.password);
    return passwordMatch;
  }
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, config.saltFactor);
  }
}
