import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { MutationHookOptions } from 'react-apollo-hooks/lib/useMutation';
import { UserRole } from '.';

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
export const saveLoginSession = (data: Response) => {
  const { authToken, roles } = data.login;
  localStorage.setItem('token', authToken.token);
  localStorage.setItem('refreshToken', authToken.refreshToken);
  localStorage.setItem('roles', JSON.stringify(roles));
};

export const clearLoginSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('roles');
};

export function useMutation(options?: MutationHookOptions<Response, Variables>) {
  return ReactApolloHooks.useMutation<Response, Variables>(MUTATION, options);
}

export interface Response {
  readonly login: {
    readonly authToken: AuthToken;
    readonly roles: UserRole[];
  };
}

export interface AuthToken {
  readonly token: string;
  readonly refreshToken: string;
}

export interface Variables {
  username?: string;
  email?: string;
  password: string;
}
