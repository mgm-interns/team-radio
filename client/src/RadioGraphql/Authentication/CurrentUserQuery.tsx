import gql from 'graphql-tag';
import * as React from 'react';
import { DataProps, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';
import { UserRole } from '.';
import { PartialQueryProps } from '../types';

export function CurrentUserQuery(props: CurrentUserQuery.Props) {
  return <CurrentUserQuery.QueryComponent query={CurrentUserQuery.QUERY} {...props} />;
}

export namespace CurrentUserQuery {
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

  export class QueryComponent extends GraphQLQuery<Response, Variables> {}

  export function withHOC<TProps>(options?: OperationOption<TProps, Response, Variables>) {
    return graphql<TProps, Response, Variables>(QUERY, options);
  }

  export interface WithHOCProps extends DataProps<Response, Variables> {}

  export interface Props extends PartialQueryProps<Response, Variables> {}
}
