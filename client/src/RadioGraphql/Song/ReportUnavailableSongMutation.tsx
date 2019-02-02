import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { MutationHookOptions } from 'react-apollo-hooks/lib/useMutation';

export const MUTATION = gql`
  mutation reportUnavailableSong($url: String!, $errorCode: Int!, $stationId: String) {
    reportUnavailableSong(url: $url, errorCode: $errorCode, stationId: $stationId)
  }
`;

export function useMutation(options?: MutationHookOptions<Response, Variables>) {
  return ReactApolloHooks.useMutation<Response, Variables>(MUTATION, options);
}

export interface Response {
  readonly reportUnavailableSong: boolean;
}

export interface Variables {
  stationId?: string;
  url: string;
  errorCode: number;
}
