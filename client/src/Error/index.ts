import { ApolloError } from 'apollo-boost';
import { GraphQLError } from 'graphql';

export namespace ErrorHelper {
  export function extractError(error: ApolloError): RadioGraphQLError | null {
    if (error.graphQLErrors.length === 0) return null;
    return error.graphQLErrors[0] as RadioGraphQLError;
  }

  export function extractStatusCode(error: ApolloError): number {
    return extractError(error).statusCode;
  }
}

export interface RadioGraphQLError extends GraphQLError {
  readonly statusCode: number;
  readonly statusCodeText: string;
}
