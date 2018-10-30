import gql from 'graphql-tag';
import { FetchResult, graphql, MutateProps, Mutation as GraphQLMutation } from 'react-apollo';
import { UserRole } from '.';

export namespace LoginMutation {
  export const MUTATION = gql`
    mutation login($username: String, $email: String, $password: String!) {
      login(credential: { username: $username, email: $email, password: $password }) {
        authToken {
          token
          refreshToken
        }
        roles {
          role
          stationId
        }
      }
    }
  `;

  export interface Response {
    login: {
      authToken: AuthToken;
      roles: UserRole[];
    };
  }

  export interface AuthToken {
    token: string;
    refreshToken: string;
  }

  export interface Variables {
    username?: string;
    email?: string;
    password: string;
  }

  export interface MutationResult extends FetchResult<Response> {}

  export class Mutation extends GraphQLMutation<Response, Variables> {}

  export const withHOC = <TProps>() =>
    graphql<TProps, Response, Variables>(MUTATION, {
      options: {
        onCompleted: saveLoginSession
      }
    });

  export interface WithHOCProps extends MutateProps<Response, Variables> {}

  export function saveLoginSession(data: Response) {
    const { authToken, roles } = data.login;
    localStorage.setItem('token', authToken.token);
    localStorage.setItem('refreshToken', authToken.refreshToken);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  export function clearLoginSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('roles');
  }
}
