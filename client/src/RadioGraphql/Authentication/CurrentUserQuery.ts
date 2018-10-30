import gql from 'graphql-tag';
import { DataProps, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';
import { UserRole } from '.';

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
    id: string;
    email: string;
    username: string;
    firstname?: string;
    lastname?: string;
    name?: string;
    avatarUrl?: string;
    roles: UserRole[];
  }

  export interface Response {
    currentUser: User;
  }

  export interface Variables {}

  export class Query extends GraphQLQuery<Response, Variables> {}

  export const withHOC = <TProps>(options?: OperationOption<TProps, Response, Variables>) =>
    graphql<TProps, Response, Variables>(QUERY, options);

  export interface WithHOCProps extends DataProps<Response, Variables> {}
}
