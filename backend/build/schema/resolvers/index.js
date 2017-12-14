'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _graphqlToolsTypes = require('graphql-tools-types');

var _graphqlToolsTypes2 = _interopRequireDefault(_graphqlToolsTypes);

var _authorization = require('./authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootResolvers = {
  Date: _graphqlToolsTypes2.default.Date({ name: 'Date' })
};

// authorization


const resolvers = [rootResolvers, ..._authorization2.default];
exports.default = (0, _mergeGraphqlSchemas.mergeResolvers)(resolvers);