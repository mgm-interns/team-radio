import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, MutateProps, Mutation as GraphQLMutation } from 'react-apollo';
import { UserRole } from '.';
import { PartialMutationProps } from '../types';

const MUTATION = gql`
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

export class MutationComponent extends GraphQLMutation<Response, Variables> {}

const LoginMutation: any = (props: Props) => {
  return <MutationComponent mutation={MUTATION} {...props} />;
};

export default LoginMutation;

LoginMutation.saveLoginSession = (data: Response) => {
  const { authToken, roles } = data.login;
  localStorage.setItem('token', authToken.token);
  localStorage.setItem('refreshToken', authToken.refreshToken);
  localStorage.setItem('roles', JSON.stringify(roles));
};

LoginMutation.clearLoginSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('roles');
};

export function withHOC<TProps>() {
  return graphql<TProps, Response, Variables>(MUTATION, {
    options: {
      onCompleted: LoginMutation.saveLoginSession
    }
  });
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

export interface WithHOCProps extends MutateProps<Response, Variables> {}

export interface Props extends PartialMutationProps<Response, Variables> {}
