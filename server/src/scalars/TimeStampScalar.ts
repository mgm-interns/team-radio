import { GraphQLScalarType, Kind } from 'graphql';

export const TimestampScalar = new GraphQLScalarType({
  name: 'Timestamp',
  description: 'Timestamp',
  parseValue(value: string) {
    return new Date(value).getTime();
  },
  serialize(value: number) {
    return new Date(value).toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value).getTime();
    }
    if (ast.kind === Kind.INT) {
      return Number(ast.value);
    }
    return null;
  }
});
