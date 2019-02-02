import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { MutationHookOptions } from 'react-apollo-hooks/lib/useMutation';

export const MUTATION = gql`
  mutation joinStation($stationId: String!) {
    joinStation(stationId: $stationId)
  }
`;

export function useMutation(options: MutationHookOptions<Response, Variables>) {
  return ReactApolloHooks.useMutation<Response, Variables>(MUTATION, options);
}

export interface Response {
  readonly joinStation: boolean;
}

export interface Variables {
  stationId: string;
}
