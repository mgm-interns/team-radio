import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';
import { UserRole } from '.';

export const QUERY = gql`
  query currentUser {
    currentUser {
      id
      email
      username
      firstname
      lastname
      name
      avatarUrl
      coverUrl
      country
      city
      bio
      roles {
        role
        stationId
      }
    }
  }
`;

export function useQuery(options?: QueryHookOptions<Variables>) {
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
  readonly coverUrl?: string;
  readonly country?: string;
  readonly city?: string;
  readonly bio?: string;
  readonly roles: UserRole[];
}

export interface Response {
  readonly currentUser: User;
}

export interface Variables {}
