import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';

export const QUERY = gql`
  query User($id: String!) {
    item: User(id: $id) {
      id
      email
      username
      firstname
      lastname
      name
      avatarUrl
    }
  }
`;

export function useQuery(options: QueryHookOptions<Variables>) {
  return ReactApolloHooks.useQuery<Response, Variables>(QUERY, options);
}

export interface User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly name?: string;
  readonly avatarUrl?: string;
}

export interface Response {
  readonly item: User;
}

export interface Variables {
  id: string;
}
