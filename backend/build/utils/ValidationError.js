"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}
exports.default = ValidationError;