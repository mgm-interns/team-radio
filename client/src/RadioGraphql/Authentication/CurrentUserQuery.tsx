import gql from 'graphql-tag';
import * as React from 'react';
import { DataProps, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';
import { UserRole } from '.';
import { PartialQueryProps } from '../types';

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
      roles {
        role
        stationId
      }
    }
  }
`;

class QueryComponent extends GraphQLQuery<Response, Variables> {}

export default function CurrentUserQuery(props: Props) {
  return <QueryComponent query={QUERY} {...props} />;
}

export function withHOC<TProps>(options?: OperationOption<TProps, Response, Variables>) {
  return graphql(QUERY, options);
}

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
  readonly roles: UserRole[];
}

export interface Response {
  readonly currentUser: User;
}

export interface Variables {}

export interface WithHOCProps extends DataProps<Response, Variables> {}

export interface Props extends PartialQueryProps<Response, Variables> {}
