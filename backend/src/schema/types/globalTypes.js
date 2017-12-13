export default `
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
