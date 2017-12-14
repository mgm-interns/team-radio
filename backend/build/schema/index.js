'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: _types2.default, resolvers: _resolvers2.default });