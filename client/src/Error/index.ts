import { ApolloError } from 'apollo-boost';

export namespace ErrorHelper {
  export function extractError(error: ApolloError): GraphQLError | null {
    if (error.graphQLErrors.length === 0) return null;
    return error.graphQLErrors[0];
  }

  export function extractStatusCode(error: ApolloError): number {
    return extractError(error).statusCode;
  }
}

export interface GraphQLError {
  message: string;
  locations: [{ line: number; column: number }];
  path: string[];
  statusCode: number;
  statusCodeText: string;
}
