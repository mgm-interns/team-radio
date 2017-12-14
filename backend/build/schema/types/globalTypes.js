"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
scalar Date
type RequestResult {
  success: Boolean!
  message: String!
}
type Query {
  test: String
}
type Mutation {
  testMutation: String
}
type Subscription {
  placeholder: String
}
`;