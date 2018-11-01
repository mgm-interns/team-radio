import { ApolloError } from 'apollo-boost';
import { GraphQLError } from 'graphql';

export const ErrorHelper = {
  extractError(error: ApolloError): RadioGraphQLError | null {
    if (error.graphQLErrors.length === 0) return null;
    return error.graphQLErrors[0] as RadioGraphQLError;
  },

  extractStatusCode(error: ApolloError): number | null {
    const extractedError = ErrorHelper.extractError(error);
    return extractedError ? extractedError.statusCode : null;
  }
};

export interface RadioGraphQLError extends GraphQLError {
  readonly statusCode: number;
  readonly statusCodeText: string;
}
